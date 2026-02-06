/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mostaql.hsoubcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ms.hsoubcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'suar.hsoubcdn.me',
      },
      {
        protocol: 'https',
        hostname: 'i.suar.me',
      },
    ],
  },
}

export default nextConfig;
