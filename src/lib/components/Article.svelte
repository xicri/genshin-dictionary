<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  const { children }: Props = $props();
</script>

<div class="flex justify-center pl-3 pr-3">
  <div class="max-w-3xl w-full">
    {@render children()}
  </div>
</div>
