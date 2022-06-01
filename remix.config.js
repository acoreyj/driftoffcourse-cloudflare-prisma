require('dotenv').config();
const { replace } = require('esbuild-plugin-replace');
const { withEsbuildOverride } = require('remix-esbuild-override');

/**
 * Define callbacks for the arguments of withEsbuildOverride.
 * @param option - Default configuration values defined by the remix compiler
 * @param isServer - True for server compilation, false for browser compilation
 * @param isDev - True during development.
 * @return {EsbuildOption} - You must return the updated option
 */
withEsbuildOverride((option, { isServer, isDev }) => {
	// console.log('isServer', isServer);
	// if (isServer) option.mainFields = ['browser', 'module', 'main'];
	if (isServer) {
		option.define = {
			...option.define,
			process: JSON.stringify({
				env: {
					...process.env,
				},
			}),
		};
		option.plugins = [
			...option.plugins,
			replace({
				include: /.*\.js$/,
				values: {
					'xhr.overrideMimeType': 'xhr && xhr.overrideMimeType',
				},
			})
		];
	}
	return option;
});
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	serverBuildTarget: 'cloudflare-pages',
	server: './server.js',
	devServerBroadcastDelay: 1000,
	ignoredRouteFiles: ['**/.*'],
	// appDirectory: "app",
	// assetsBuildDirectory: "public/build",
	// serverBuildPath: "functions/[[path]].js",
	// publicPath: "/build/",
};
