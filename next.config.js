/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: [ "en", "ja", "zh-CN" ],
    defaultLocale: "en",
    localeDetection: true,
  },
};

export default nextConfig;
