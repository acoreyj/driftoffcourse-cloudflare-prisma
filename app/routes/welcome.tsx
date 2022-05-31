
import { MetaFunction } from '@remix-run/cloudflare';
import SiteLayout from "~/components/SiteLayout";
import StarterKit from "~/components/StarterKit";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
    return {
			title: 'Drift Off Course',
		};
};


export default function Welcome() {
  return (
      <div>
        <div className="min-h-screen flex flex-col justify-center items-center relative">
            <main className="">
                <StarterKit/>
                <p>You're signed-up now. Please check your email for the activation email</p>
            </main>
            <aside className="text-center mt-4">
                {/* Anything? */}
            </aside>
        </div>
    </div>
  );
}
