import type { NextConfig } from "next";
const workspaceRoot = process.cwd();
const nextConfig: NextConfig = { poweredByHeader: false, reactStrictMode: true, turbopack: { root: workspaceRoot }, outputFileTracingRoot: workspaceRoot };
export default nextConfig;
