<template>
  <component :is="link ? 'a' : 'div'" :href="href" class="tag" @click="emit('click')">
    <span>{{ tagName }}</span>
    <span v-if="button" class="tag__button" @click="emit('buttonClick')">
      {{ button }}
    </span>
  </component>
</template>

<script lang="ts" setup>
import allTags from "~/dataset/tags.json";
import type { Locale, TagID } from "~/types";

const localePath = useLocalePath();
const { locale } = useI18n<[], Locale>();

const props = defineProps({
  tagid: {
    type: String as PropType<TagID>,
    required: true,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  button: {
    type: String,
    required: false,
    default: undefined,
  },
  size: {
    type: String as PropType<"medium" | "small">,
    required: false,
    default: "medium",
  },
  // required to be defined here to check if these events are listened by parent components
  onClick: {
    type: Function,
    required: false,
    default: undefined,
  },
  onButtonClick: {
    type: Function,
    required: false,
    default: undefined,
  },
});

const emit = defineEmits([
  "click",
  "buttonClick",
]);

const tagName = allTags[props.tagid][locale.value];
const href = props.link ? localePath(`/tags/${props.tagid}`) : undefined;
const fontSize = props.size === "medium" ? "15px" : "12px";

let entirePointer: "default" | "pointer";
let buttonPointer: "default" | "pointer";

if (props.onClick && props.onButtonClick) {
  throw new Error("You can set @click or @buttonClick, not both at the same time.");
} else if (props.link || props.onClick) {
  entirePointer = "pointer";
  buttonPointer = "pointer";
} else if (props.onButtonClick) {
  entirePointer = "default";
  buttonPointer = "pointer";
} else { // None of @click and @buttonClick are defined
  entirePointer = "default";
  buttonPointer = "default";
}

if ((props.link && !!props.onClick) || (props.link && !!props.onButtonClick)) {
  throw new Error("link and onClick/onButtonClick cannot be set at the same time.");
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

  font-size: v-bind("fontSize");
  cursor: v-bind("entirePointer");

  &__button {
    font-weight: 1000;
    cursor: v-bind("buttonPointer");
  }
}
</style>
