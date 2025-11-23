/** @type {import('next').NextConfig} */

const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
	compress: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles/settings')],
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	redirects: async () => [
		{
			source: '/uputstvo',
			destination: 'https://youtu.be/dWPwugX_BzQ',
			permanent: false,
		},
		{
			source: '/uputstvo-mouth',
			destination: 'https://youtu.be/2ClLRwFiaw8',
			permanent: false,
		},
	],
};

module.exports = withBundleAnalyzer(nextConfig);
