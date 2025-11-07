/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com",       // ✅ Add your actual image domain
      "yourapi.com",       // (add more if needed)
      "cdn.shopify.com",   // (for Shopify/CDN images)
      "res.cloudinary.com",
      "localhost.com",
      "http://localhost:5173",
      "localhost"  // (if you use Cloudinary)
    ],
  },
};

module.exports = nextConfig;
