/** @jsxRuntime classic */
/** @jsx jsx */
import { signOut, getAuth } from 'firebase/auth';
import type { ActionFunction } from '@remix-run/cloudflare';
import { useFetcher, useNavigate, useSearchParams, useTransition } from "@remix-run/react";
import { useEffect } from 'react';
import { logout } from '~/utils';
import { firebaseIdCookieName } from '~/config';
export let action: ActionFunction = async ({ request }) => {
	return new Response('...', {
		headers: {
			'Set-Cookie': `${firebaseIdCookieName}='';Max-Age=0; path=/;`,
		},
	});
};
export default function Logout() {
	const auth = getAuth();
	const transition = useTransition();
	const fetcher = useFetcher();
	const [searchParams] = useSearchParams();

	let navigate = useNavigate();
	useEffect(() => {
		const sendTo = searchParams.get('sendto') || '/';

		if (fetcher.type === 'init') {
			logout(fetcher);
		}
		if (fetcher.data && transition.state === 'idle') {
			signOut(auth).finally(() => {
				navigate(sendTo);
			});
		}
	}, [auth, fetcher, navigate, searchParams, transition.state]);
	return null;
}
