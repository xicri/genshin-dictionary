<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { htmlAttrs, meta, link } = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
}).value;
const { lang } = htmlAttrs;
let siteName;
let description;

if (lang === "zh-CN") {
  siteName = "原神中英日辞典";
  description = "一个在线的中英日三语原神游戏用语辞典";
} else if (lang === "ja-JP") {
  siteName = "原神英語・中国語辞典";
  description = "原神の固有名詞等の英語表記、及び中国語表記の一覧を掲載しています。";
} else {
  siteName = "Genshin Dictionary";
  description = "An online English-Chinese-Japanese dictionary for terms in Genshin Impact";
}

const runtimeConfig = useRuntimeConfig();

useHead({
  htmlAttrs,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
    { hid: "description", name: "description", content: description },
    { hid: "og:description", property: "og:description", content: description },
    { hid: "og:type", property: "og:type", content: "website" },
    { hid: "og:site_name", property: "og:site_name", content: siteName },
    { hid: "twitter:card", property: "twitter:card", content: "summary" },
    { hid: "twitter:site", property: "twitter:site", content: "@xicri_gi" },
    { hid: "twitter:creator", property: "twitter:creator", content: "@xicri_gi" },
    ...meta,
  ],
  link: [
    { rel: "icon", href: "/images/favicon.svg", type: "image/svg+xml" },
    ...link,
  ],
  script: [
    ...(runtimeConfig.serverEnv === "production" ? [{
      hid: "cloudflare-wa",
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      "data-cf-beacon": "{\"token\": \"1f401150384f4aaa9d14b208aac9fdba\"}",
      defer: true,
    }] : []),
  ],
});
</script>
