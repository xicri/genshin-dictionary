<template>
  <div>
    <div class="layout-default__nav-wrapper">
      <nav class="layout-default__nav">
        <h1>
          <a :href="localePath('/')" class="layout-default__title">
            <span>{{ $t("siteTitleL1") }}</span><span>{{ $t("siteTitleL2") }}</span>
          </a>
        </h1>

        <spacer />
        <hamburger-menu />
      </nav>
    </div>

    <Nuxt />
  </div>
</template>

<i18n>
{
  "en": {
    "siteTitleL1": "Genshin",
    "siteTitleL2": "Dictionary"
  },
  "ja": {
    "siteTitleL1": "原神 英語・",
    "siteTitleL2": "中国語辞典"
  },
  "zh-CN": {
    "siteTitleL1": "Genshin",
    "siteTitleL2": "Dictionary"
  }
}
</i18n>

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
  }
}
</style>
