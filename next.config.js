/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: !isProd,
});

const nextConfig = {
	images: {
		domains: [
			'localhost',
			'img.clerk.com',
			'threads-backend-b8daee83f8bc.herokuapp.com',
		],
	},
};

module.exports = withPWA(nextConfig);
