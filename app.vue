<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { htmlAttrs, meta, link } = useLocaleHead({
  dir: true,
  key: "id",
  lang: true,
  seo: true,
}).value;
const lang = htmlAttrs?.lang ?? "en-US";
let siteName;
let description;

if (lang === "zh-CN") {
  siteName = "原神中英日辞典";
  description = "一个在线的中英日三语原神游戏用语辞典";
} else if (lang === "zh-TW") {
  siteName = "原神中英日辭典";
  description = "一個線上的中英日三語原神遊戲用語辭典";
} else if (lang === "ja-JP") {
  siteName = "原神英語・中国語辞典";
  description = "原神の固有名詞等の英語表記、及び中国語表記の一覧を掲載しています。";
} else { // en-US or others
  siteName = "Genshin Dictionary";
  description = "An online English-Chinese-Japanese dictionary for terms in Genshin Impact";
}

const runtimeConfig = useRuntimeConfig().public;

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
    {
      hid: "google-site-verification",
      name: "google-site-verification",
      content: "siYv7dgV8-NP15jdAUtGC0L52osNwLDBt7HFe2LH-3s",
    },
    ...(meta ?? []),
  ],
  link: [
    { rel: "icon", href: "/images/favicon.svg", type: "image/svg+xml" },
    { rel: "me", href: "https://focalorus.io/@xicri" },
    ...(link ?? []),
  ],
});
</script>
