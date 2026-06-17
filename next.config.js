/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: true
  },
  modularizeImports: {
    "react-icons/?(((\\w*)?/?)*)": {
      transform: "react-icons/{{ matches.[1] }}/{{ member }}",
    },
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
