<template>
  <div class="tag">
    <span>{{ tagName }}</span>
  </div>
</template>

<script lang="ts" setup>
import allTags from "~/dataset/tags.json";
import type { Locale, TagID } from "~/types";

const { locale } = useI18n<[], Locale>();

const props = defineProps({
  tagid: {
    type: String as PropType<TagID>,
    required: true,
  },
});

const tagName = allTags[props.tagid][locale.value];
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.tag {
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  border-color: vars.$color-dark;

  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.2em;
  padding-right: 0.2em;

  color: vars.$color-dark;
  background-color: vars.$color-lightest;
}
</style>
