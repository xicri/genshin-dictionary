<template>
  <div class="tag">
    <span>{{ tagName }}</span>
    <span v-if="button" class="tag__button" @click="emit('buttonClick')">
      {{ button }}
    </span>
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
  button: {
    type: String,
    required: false,
    default: undefined,
  },
  // required to be defined here to check if these events are listened by parent components
  onButtonClick: {
    type: Function,
    required: false,
    default: undefined,
  },
});

const emit = defineEmits([ "buttonClick" ]);

const tagName = allTags[props.tagid][locale.value];

let buttonPointer: "default" | "pointer";

if (props.onButtonClick) {
  buttonPointer = "pointer";
} else { // @buttonClick is not defined
  buttonPointer = "default";
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.tag {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.34em;

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

  &__button {
    font-weight: 1000;
    cursor: v-bind("buttonPointer");
  }
}
</style>
