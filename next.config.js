const withSvgr = require("next-plugin-svgr");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

module.exports = withSvgr(nextConfig);
