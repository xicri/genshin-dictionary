<template>
  <div>
    <div class="layout-default__nav-wrapper">
      <nav class="layout-default__nav">
        <h1>
          <a :href="localePath('/')" class="layout-default__title">
            <span>原神 英語・</span><span>中国語辞典</span>
          </a>
        </h1>

        <spacer />
        <hamburger-menu />
      </nav>
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
}
</style>
