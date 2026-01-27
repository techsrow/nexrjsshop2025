/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.alsaifsheesha.online",
      "alsaifsheesha.online",
      "res.cloudinary.com",
      "localhost",
      "yourcdn.com",
    ],
    remotePatterns: [
      // Cloudinary (covers all paths, safest)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Localhost with port (if you ever use it)
      {
        protocol: "http",
        hostname: "localhost",
        port: "6001",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
