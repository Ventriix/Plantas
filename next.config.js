/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**x**"
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**"
      }
    ]
  }
}

module.exports = nextConfig
