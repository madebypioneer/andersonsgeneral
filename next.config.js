/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
      domains: ['inside2.andersonsgeneral.com', 'cdn.shopify.com'],
    },
    compiler: {
      styledComponents: true
    },
  }

module.exports = nextConfig
