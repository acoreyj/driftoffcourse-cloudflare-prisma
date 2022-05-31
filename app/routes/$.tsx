import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	if (url.pathname.endsWith('.d')) {
		throw new Response('Not Found', {
			status: 404,
		});
	}
	return redirect(`${url.pathname}.d${url.search}`, 301);
};

export const action: ActionFunction = async ({ request }) => {
	const url = new URL(request.url);
	if (url.pathname.endsWith('.d')) {
		throw new Response('Not Found', {
			status: 404,
		});
	}
	return redirect(`${url.pathname}.d${url.search}`, 301);
};
