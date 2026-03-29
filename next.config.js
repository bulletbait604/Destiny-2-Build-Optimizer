/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['destinytracker.com', 'bungie.net'],
  },
}

module.exports = nextConfig
