<template>
  <div>
    <div class="layout-default__nav-wrapper">
      <nav class="layout-default__nav">
        <h1>
          <a href="/" class="layout-default__title">
            <span>原神 英語・</span><span>中国語辞典</span>
          </a>
        </h1>

        <a href="https://translate.genshin-dictionary.com/" class="layout-default__translator-link-pc layout-default__translator-link">
          原神 自動翻訳<sup class="layout-default__new">New!</sup>
        </a>

        <spacer />

        <hamburger-menu class="layout-default__menu" />
      </nav>
    </div>
    <div class="layout-default__translator-link-mobile">
      <a href="https://translate.genshin-dictionary.com/" class="layout-default__translator-link">
        原神 自動翻訳<sup class="layout-default__new">New!</sup>
      </a>
    </div>

    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/variables.scss" as vars;

.layout-default {
  &__nav-wrapper {
    display: flex;
    justify-content: center;

    $margin: 12px;
    margin-left: $margin;
    margin-right: $margin;
    width: calc(100% - #{ $margin * 2 });
  }
  &__nav {
    max-width: vars.$max-width;
    width: 100%;
    margin-top: 24px;
    margin-bottom: 36px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    font-weight: 300;
    font-size: 32px;
    color: vars.$color-dark;
    letter-spacing: 1px;
    text-align: center;
  }

  @media (min-width: vars.$max-width) { // PC
    &__translator-link-pc {
      display: block;
    }
    &__translator-link-mobile {
      display: none;
    }
  }

  @media (max-width: vars.$max-width) { // Mobile
    &__translator-link-pc {
      display: none;
    }
    &__translator-link-mobile {
      display: flex;
      justify-content: center;

      background-color: lighten(vars.$color-dark, 75%);

      padding: 2em;
      margin-bottom: 2em;
    }
  }

  &__new {
    font-size: 0.7em;
  }
}
</style>
