import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN + common private-network dev origins so `npm run dev` works
  // when you open the site from another device (phone, tablet, other laptop).
  // Add your own hostnames/IPs to this list if you deploy the dev server
  // behind a different origin.
  allowedDevOrigins: [
    "192.168.2.142",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "localhost",
    "*.local",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
