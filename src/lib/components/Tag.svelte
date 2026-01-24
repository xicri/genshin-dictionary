<script lang="ts">
  import { getLocale } from "$lib/paraglide/runtime.js";
  import allTags from "$lib/dataset/tags.json";
  import type { TagID } from "$lib/types";

  type Props = {
    tagid: TagID;
  };

  const { tagid }: Props = $props();
  const currentLocale = getLocale();

  const tagName = allTags[tagid][currentLocale];
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

.tag {
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  border-color: vars.$color-dark;

  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;

  margin-right: 6px;

  color: vars.$color-dark;
  background-color: vars.$color-lightest;
}
</style>

<div class="tag">
  <span data-e2e="tag-name">{ tagName }</span>
</div>
