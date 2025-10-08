/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint check during `next build`
    ignoreDuringBuilds: true,
  },
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',

      },
    ],
  },
};

module.exports = nextConfig;
