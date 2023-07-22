<template>
  <div>
    <input id="menu-switch" type="checkbox" :checked="open" style="display: none;" @click="toggleMenu" />
    <label class="menu__icon" for="menu-switch">
      <div class="menu__icon-line" />
      <div class="menu__icon-line" />
      <div class="menu__icon-line" />
    </label>
    <nav class="menu__nav">
      <div class="menu__nav-padding">
        <ul class="menu__items">
          <!-- localePath() generates path without trailing slash, so append manually -->
          <li class="menu__item">
            <a :href="localePath('/about')">{{ t("about") }}</a>
          </li>
          <li class="menu__item">
            <a :href="localePath('/opendata')">{{ t("opendata") }}</a>
          </li>
          <li class="menu__item">
            <a :href="localePath('/history')">{{ t("history") }}</a>
          </li>
          <li class="menu__item">
            <a href="https://translate.genshin-dictionary.com/" target="_blank" rel="noopener">{{ t("translate") }}</a>
            <img src="~/assets/vendor/octicons/link-external.svg" alt="" decoding="async" width="14" height="14" />
          </li>
        </ul>

        <h2 class="menu__languages-title">
          Languages
        </h2>
        <div class="menu__languages-list">
          <NuxtLink
            v-for="locale in locales"
            :key="locale.code"
            class="menu__languages-item"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </NuxtLink>
        </div>

        <div class="menu__bottomline">
          <a href="https://github.com/xicri?tab=repositories" target="_blank" rel="noopener">GitHub</a>
          <a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a>
        </div>
      </div>
    </nav>
    <closing-layer :enabled="open" @close="closeMenu" />
  </div>
</template>

<i18n>
{
  "en": {
    "about": "About",
    "opendata": "Opendata / API",
    "history": "History",
    "translate": "Genshin Machine Translate (Japanese)"
  },
  "ja": {
    "about": "このサイトについて",
    "opendata": "オープンデータ・API",
    "history": "更新履歴",
    "translate": "原神 自動翻訳"
  },
  "zh-CN": {
    "about": "关于",
    "opendata": "开放数据 · API",
    "history": "更新记录",
    "translate": "原神机器翻译（日语）"
  }
}
</i18n>

<script lang="ts" setup>
import type { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";
import type { Locale } from "~/types";

//
// refs
//
const i18n = useI18n<[], Locale>({
  useScope: "local",
});
const locales = <LocaleObject[]>i18n.locales.value;
const t = i18n.t;
const open = ref(false);

//
// event handlers
//
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const toggleMenu = (evt: MouseEvent): void => {
  open.value = (<HTMLInputElement>evt.target)?.checked;
};
const closeMenu = (): void => {
  open.value = false;
};
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

  &__nav-padding {
    width: 100%;
    height: 100%;
    padding-left: 2.5rem;
  }

  &__items {
    margin-top: 7em;
    margin-bottom: 3rem;
    padding: 0;
  }
  &__item {
    margin-bottom: 2em;
  }

  &__languages-title {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  &__languages-list {
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;

    padding-left: 1.5rem;
    margin-bottom: 2rem;
  }
  &__languages-item {
    color: vars.$color-dark;
    cursor: pointer;
  }

  &__bottomline {
    display: flex;
    column-gap: 1.5em;
    font-size: 0.7rem;
  }
}
</style>
