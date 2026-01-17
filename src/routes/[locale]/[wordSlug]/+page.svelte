<script lang="ts">
  import WordCard from "$lib/components/WordCard.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
  <meta property="og:title" content={data.title} />
  <meta property="description" content={data.description} />
  <meta property="og:description" content={data.description} />
</svelte:head>

<WordCard word={data.word} />
