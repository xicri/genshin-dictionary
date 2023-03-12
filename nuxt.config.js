export default async () => {
  const config = {
    target: "server",
    components: true,
    modern: "client",

    buildModules: [
      "@nuxtjs/composition-api/module",
      "@pinia/nuxt",
    ],
  };

  return config;
};
