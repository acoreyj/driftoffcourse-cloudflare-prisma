// /**
//  * @type {import('@remix-run/dev/config').AppConfig}
//  */
// module.exports = {
// 	appDirectory: 'app',
// 	assetsBuildDirectory: 'public/build',
// 	publicPath: '/build/',
// 	serverBuildDirectory: 'build',
// 	devServerBroadcastDelay: 1000,
// 	ignoredRouteFiles: ['.*'],
// 	esbuildOverride: (option, { isServer }) => {
// 		console.log('isServer', isServer);
// 		if (isServer) option.mainFields = ['browser', 'module', 'main'];

// 		return option;
// 	},
// };
const { withEsbuildOverride } = require('remix-esbuild-override');
/**
 * Define callbacks for the arguments of withEsbuildOverride.
 * @param option - Default configuration values defined by the remix compiler
 * @param isServer - True for server compilation, false for browser compilation
 * @param isDev - True during development.
 * @return {EsbuildOption} - You must return the updated option
 */
withEsbuildOverride((option, { isServer, isDev }) => {
	console.log('isServer', isServer);
	if (isServer) option.mainFields = ['browser', 'module', 'main'];

	return option;
});

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	serverBuildTarget: 'cloudflare-workers',
	server: './server.js',
	devServerBroadcastDelay: 1000,
	ignoredRouteFiles: ['**/.*'],
	appDirectory: 'app',
	assetsBuildDirectory: 'public/build',
	serverBuildPath: 'build/index.js',
	// publicPath: "/build/",
};
