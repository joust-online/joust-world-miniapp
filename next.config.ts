import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow World App domains for images
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.world.org" }],
  },
  experimental: {
    optimizePackageImports: ["motion/react", "ogl", "lucide-react"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        webgl: {
          priority: 30,
          name: "webgl",
          test: /[\\/]node_modules[\\/](ogl|three)[\\/]/,
          chunks: "async" as const,
        },
      };
    }
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
