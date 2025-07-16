<template>
  <div class="tag">
    <span>{{ TagName }}</span>
  </div>
</template>

<script lang="ts" setup>
import allTags from "~/dataset/tags.json";
import type { Locale, TagID } from "~/utils/types.ts";

const { locale } = useI18n<[], Locale>();

const props = defineProps({
  tagid: {
    type: String as PropType<TagID>,
    required: true,
  },
});

const TagName = computed(() => allTags[props.tagid][locale.value]);
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

  margin-right: 6px;

  color: vars.$color-dark;
  background-color: vars.$color-lightest;
}
</style>
