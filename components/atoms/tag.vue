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

  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;

  color: vars.$color-dark;
  background-color: vars.$color-lightest;
}
</style>
