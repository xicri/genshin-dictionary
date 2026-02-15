<script lang="ts">
  import WordList from "$lib/components/WordList.svelte";
  import { m } from "$lib/paraglide/messages.js";

  const title = `${ m.siteTitle() } ― ${ m.indexTitleDesc() }`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

<WordList />
