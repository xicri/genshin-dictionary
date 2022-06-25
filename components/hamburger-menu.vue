<template>
  <div>
    <input id="menu-switch" type="checkbox" :checked="open" style="display: none;" @click="toggleMenu">
    <label class="menu__icon" for="menu-switch">
      <div class="menu__icon-line"></div>
      <div class="menu__icon-line"></div>
      <div class="menu__icon-line"></div>
    </label>
    <nav class="menu__nav">
      <ul class="menu__items">
        <li class="menu__item">
          <a href="/about/">このサイトについて</a>
        </li>
        <li class="menu__item">
          <a href="/opendata/">オープンデータ・API</a>
        </li>
        <li class="menu__item">
          <a href="/history/">更新履歴</a>
        </li>
        <li class="menu__item">
          <a href="https://translate.genshin-dictionary.com/" target="_blank">原神 自動翻訳</a>
          <img src="~/assets/vendor/octicons/link-external.svg" alt="" decoding="async" width="14" height="14">
        </li>
      </ul>
    </nav>
    <closing-layer :enabled="open" @close="closeMenu" />
  </div>
</template>

<script>
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const open = ref(false);

    return {
      // refs
      open,
      // event handlers
      toggleMenu(evt) {
        this.open = evt.target.checked;
      },
      closeMenu() {
        this.open = false;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.menu {
  &__icon {
    display: block;
    cursor: pointer;
    z-index: 20;
  }
  &__icon-line {
    width: 35px;
    height: 5px;
    background-color: vars.$color-dark;
    margin: 6px 0;
  }

  &__nav {
    visibility: hidden;
    position: fixed;
    top: 0;
    right: 0;

    width: 0;
    height: 100vh;

    transition: width 300ms, visibility 300ms;

    background-color: white;
    box-shadow: -5px 0 5px #c0c0c0;

    z-index: 15;
  }
  #menu-switch:checked ~ &__nav {
    visibility: visible;
    width: 240px;
  }

  &__items {
    margin-top: 7em;
  }
  &__item {
    margin-bottom: 2em;
  }
}
</style>
