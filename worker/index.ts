import * as build from "../build/index.js"
import { createFetchHandler } from "./adapter"
import { getClient } from '../app/lib/db.server';
const handleFetch = createFetchHandler({
	build,

	/**
	 * Context to be available on `loader` or `action`, default to `undefined` if not defined
	 * @param request Request object
	 * @param env Variables defined on the environment
	 * @param ctx Exectuion context, i.e. ctx.waitUntil() or ctx.passThroughOnException();
	 * @returns Context
	 */
	getLoadContext(request, env, context) {
		return {
			...context,
			prismaRead: getClient('read'),
			prismaWrite: getClient('write'),
			cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
		};
	},

	getCache() {
		return caches.default;
	},
});

const worker: ExportedHandler = {
  fetch: handleFetch,
}

export default worker
