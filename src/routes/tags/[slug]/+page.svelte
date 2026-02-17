<script lang="ts">
  import WordList from "$lib/components/WordList.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

</script>

<svelte:head>
  <title>{data.title}</title>
  <meta property="og:title" content={data.title} />
</svelte:head>

<WordList tagSlug={data.slug} />
