import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Not live yet: every response tells crawlers not to index or follow.
  // Remove this header, and the robots entry in src/app/layout.tsx, at launch.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;
