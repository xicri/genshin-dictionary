<script lang="ts">
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import WordList from "$lib/components/WordList.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import tags from "../../../../dataset/tags.json";
  import { useDictionaryStore } from "~/store/index.ts";
  import type { TagID } from "$lib/types.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const getTagIdFromParams = (): TagID => {
    const tagID = data.slug;

    if (!Object.keys(tags).includes(tagID)) { // unexpected tagID given
      error(404, "Not found");
    }

    return tagID as TagID;
  };

  const { $pinia } = useNuxtApp();
  const locale = getLocale();
  const store = useDictionaryStore($pinia);

  const tagID = getTagIdFromParams();
  let title = $state(`${ tags[tagID].title[locale] } | ${ m.siteTitle() }`);

  store.$reset();
  store.addTags(tagID);

  onMount(() => {
    // Reset on browser back
    window.onpopstate = () => {
      store.$reset();
      store.addTags(tagID);
    };
  });

  const onSearch = (): void => {
    const root = `/${ locale }`;

    if (window.location.pathname !== root) {
      history.pushState({}, "", root);
      title = m.siteTitle();
    }
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<WordList onsearch={onSearch} />
