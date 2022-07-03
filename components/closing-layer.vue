<template>
  <div :style="{ display: enabled ? 'block' : 'none' }" class="closer" @click="$emit('close')"></div>
</template>

<script setup>
defineEmits([ "close" ]);

defineProps({
  enabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.closer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: transparent;
}
</style>
