/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [{
      source: "/:all*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "frame-ancestors 'self' http://sunny2.starfree.jp;",
        },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "same-site",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    }];
  },

  i18n: {
    locales: [ "default", "en", "ja", "zh-CN" ],
    defaultLocale: "default",
    localeDetection: false, // middleware handles locale redirection on root
  },
};

export default nextConfig;
