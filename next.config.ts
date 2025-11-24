import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' } // as profile image is stored on clerk
    ]
  }
  /* config options here */
};

export default nextConfig;
