<template>
  <div class="lang-switcher">
    <label for="switch" class="lang-switcher__button">
      Languages
    </label>
    <input id="switch" type="checkbox">
    <div class="lang-switcher__items">
      <button
        v-for="locale in $i18n.locales"
        :key="locale.code"
        class="lang-switcher__item"
        @click.prevent.stop="$i18n.setLocale(locale.code)"
      >
        {{ locale.name }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.lang-switcher {
  position: relative;

  &__button, &__item {
    padding: 0.4rem;
    font-size: 16px;

    cursor: pointer;
  }

  &__items {
    display: none;
  }

  &__item {
    background-color: vars.$color-lightest;
    color: vars.$color-darkest;

    border: none;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: vars.$color-lighter;

    &:last-child {
      border-bottom: none;
    }
  }
}
#switch {
  display: none;

  &:checked ~ .lang-switcher__items {
    position: absolute;
    top: 1.8em;
    left: 0;

    padding: 0.4rem;

    display: flex;
    flex-direction: column;

    border-radius: 12px;
  }
}

</style>
