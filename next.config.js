/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    SERVIDOR: process.env.SERVIDOR
  },
  images: {
    domains: ['blog.portalvmi.com.br', 'www.puertocoronel.cl']
  },
}