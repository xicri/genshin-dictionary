<template>
  <div class="tag">
    <span>{{ TagName }}</span>
  </div>
</template>

<script>
import { computed, defineComponent } from "@nuxtjs/composition-api";
import allTags from "~/static/dataset/tags.json";

export default defineComponent({
  props: {
    tagid: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {
      TagName: computed(() => allTags[props.tagid].ja),
    };
  },
});
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
