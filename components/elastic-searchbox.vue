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
  >
</template>

<script setup>
const emit = defineEmits([ "input" ]);

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  autocomplete: {
    type: String,
    default: "",
  },
});

//
// refs
//
const searchBox = ref(null);

//
// methods
//
const updateSearchBoxWidth = () => {
  const el = searchBox.value;
  const textLength = (0 < el.value.length) ? el.value.length : props.placeholder.length;
  el.style.width = `${textLength * 1.05}em`;
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
const onInput = (evt) => {
  updateSearchBoxWidth();
  emit("input", evt);
};
const stopPropagation = (evt) => {
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
