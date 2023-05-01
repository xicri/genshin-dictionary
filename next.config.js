/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: [ "default", "en", "ja", "zh-CN" ],
    defaultLocale: "default",
    localeDetection: false, // middleware handles locale redirection on root
  },
};

export default nextConfig;
