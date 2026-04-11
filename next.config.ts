import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dxkqhflc8/**", // your cloud name
      },
    ],
  },
};

module.exports = nextConfig;
export default nextConfig;
