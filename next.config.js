/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ permet de déployer même avec des erreurs ESLint
  },
};

module.exports = nextConfig;
