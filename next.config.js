const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	// Use the CDN in production and localhost for development.
	assetPrefix: isProd ? 'https://cdn.ferris.gg' : '',
	async rewrites() {
		return [
			{
				source: '/docs',
				destination: '/docs/home',
			},
		];
	},
};
