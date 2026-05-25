/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mal-ui"],
  experimental: {
    optimizePackageImports: ["mal-ui"],
  },
};

export default nextConfig;
