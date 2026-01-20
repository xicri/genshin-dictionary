<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="flex justify-center pl-6 pr-6">
  <div class="max-w-3xl w-full">
    {@render children()}
  </div>
</div>
