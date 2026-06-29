/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mal-ui'],
  // The demo lives in a monorepo; pin the tracing root to this app so Next.js
  // does not warn about the repo-root lockfile.
  outputFileTracingRoot: import.meta.dirname,
  experimental: {
    optimizePackageImports: ['mal-ui'],
  },
};

export default nextConfig;
