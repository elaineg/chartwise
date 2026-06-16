import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection — prevents /ROOT path placeholders in turbopack bundles
  // when multiple package-lock.json files are present in parent directories.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Suppress outputFileTracing root warning for the same reason
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
