import wordRedirects from "./public/dataset/redirect/words.json" assert { type: "json" };
import tagRedirects from "./public/dataset/redirect/tags.json" assert { type: "json" };

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  async headers() {
    return [{
      source: "/:all*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=30, s-maxage=5184000", // 5184000s == 60 days
        },
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

  async redirects() {
    const redirs = [];

    for (const [ src, dest ] of Object.entries(wordRedirects)) {
      redirs.push({
        source: `/${src}/`,
        destination: `/${dest}/`,
        permanent: true,
      });
    }

    for (const [ src, dest ] of Object.entries(tagRedirects)) {
      redirs.push({
        source: `/tags/${src}/`,
        destination: `/tags/${dest}/`,
        permanent: true,
      });
    }

    return redirs;
  },

  i18n: {
    locales: [ "default", "en", "ja", "zh-CN" ],
    defaultLocale: "default",
    localeDetection: false, // middleware handles locale redirection on root
  },
};

export default nextConfig;
