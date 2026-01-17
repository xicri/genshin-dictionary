<script lang="ts">
  import { error } from "@sveltejs/kit";
  import WordList from "$lib/components/WordList.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import tags from "../../../../dataset/tags.json";
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

  const locale = getLocale();
  const tagSlug = getTagIdFromParams();
  let title = $state(`${ tags[tagID].title[locale] } | ${ m.siteTitle() }`);

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

<WordList {tagSlug} onsearch={onSearch} />
