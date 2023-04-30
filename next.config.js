/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.example.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
