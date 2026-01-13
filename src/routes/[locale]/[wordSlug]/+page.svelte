<script lang="ts">
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import WordList from "$lib/components/WordList.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import { useDictionaryStore } from "~/store/index.ts";
  import type { PageProps } from "../$types";

  const { data }: PageProps = $props();

  const { $pinia } = useNuxtApp();
  const locale = getLocale();
  const store = useDictionaryStore($pinia);

  const onSearch = (): void => {
    if (window.location.pathname !== "/") {
      history.pushState({}, "", `/${ locale }`);
      document.title = m.siteTitle();
    }
  };

  store.$reset();
  store.queryByID(data.slug);
  const word = store.searchResults[0];

  if (!word) {
    error(404, "Not found");
  }

  //
  // title & description
  //
  let title;
  let description;

  if (locale === "en") {
    title = `"${ word.en }" is ` + (word.zhCN ? `"${ word.zhCN }" in Chinese` : `${ word.ja } in Japanese`) + ` | ${ m.siteTitle() }`;
    description = `"${ word.en }" is `
      + (word.zhCN ? `"${ word.zhCN }" in Chinese and ` : "")
      + `"${ word.ja }" in Japanese. This website contains English, Chinese, and Japanese translations for terms in Genshin Impact.`;
  } else if (locale === "ja") {
    title = `「${ word.ja }」は英語で "${ word.en }" | ${ m.siteTitle() }`;
    description = `「${ word.ja }」の英語表記は "${ word.en }"`
      + (word.zhCN ? `、中国語表記は「${ word.zhCN }」` : "")
      + " ― このサイトはゲーム「原神」の用語の、日本語・英語・中国語の対訳を掲載しています。";
  } else if (locale === "zh-CN") {
    title = (word.zhCN ? `"${ word.zhCN }"的英语和日语翻译` : `"${ word.en }"的日语翻译`) + ` | ${ m.siteTitle() }`;
    description = word.zhCN
      ? `"${ word.zhCN }"的英语是"${ word.en }"，日语是"${ word.ja }"。` // TODO TranslationChanged
      : `"${ word.en }"的日语是"${ word.ja }"。`;
  } else if (locale === "zh-TW") {
    title = (word.zhTW ? `"${ word.zhTW }"的英語和日語翻譯` : `"${ word.en }"的日語翻譯`) + ` | ${ m.siteTitle() }`;
    description = word.zhTW
      ? `"${ word.zhTW }"的英語是"${ word.en }"，日語是"${ word.ja }"。` // TODO TranslationChanged
      : `"${ word.en }"的日語是"${ word.ja }"。`;
  } else {
    throw new Error("Unexpected locale");
  }

  onMount(() => {
    // Reset on browser back
    window.onpopstate = () => {
      store.$reset();
      store.queryByID(word.id);
    };
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
</svelte:head>

<WordList onsearch={onSearch} />
