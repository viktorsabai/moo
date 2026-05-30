/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.104"],
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;
