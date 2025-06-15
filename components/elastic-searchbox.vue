<template>
  <input
    ref="searchBox"
    type="search"
    class="elastic-searchbox"
    :name="name"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="onInput"
    @click="stopPropagation"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits([ "input" ]);

const props = defineProps<{
  name: string;
  placeholder: string;
  autocomplete: string;
}>();

//
// refs
//
const searchBox = useTemplateRef<HTMLInputElement>("searchBox");

defineExpose({
  focus: () => searchBox.value?.focus(),
  setSelectionRange: (
    (...args) => searchBox.value?.setSelectionRange(...args)
  ) satisfies typeof HTMLInputElement.prototype.setSelectionRange,
  getTextLength: () => searchBox.value?.value.length,
});

//
// methods
//
const updateSearchBoxWidth = (): void => {
  const el = searchBox.value;
  if (el) {
    const textLength = (0 < el.value.length) ? el.value.length : props.placeholder.length;
    el.style.width = `${ textLength * 1.05 }em`;
  }
};

//
// Lifecycle Hooks
//
onMounted(() => {
  updateSearchBoxWidth();
});

//
// event handlers
//
const onInput = (evt: Event): void => {
  updateSearchBoxWidth();
  emit("input", evt);
};
const stopPropagation = (evt: MouseEvent): void => {
  evt.stopPropagation();
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.elastic-searchbox {
  border-width: 0;
  border-style: none;
  font-size: vars.$search-font-size;
  background-color: transparent;

  &:focus-visible {
    outline-style: none;
    outline-width: 0;
  }
}
</style>
