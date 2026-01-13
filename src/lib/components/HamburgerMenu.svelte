<script lang="ts">
  import ClosingLayer from "$lib/components/ClosingLayer.svelte";
  import { m } from "$lib/paraglide/messages.js";
  import { locales, localizeHref, setLocale } from "$lib/paraglide/runtime.js";

  const langNames = {
    en: "English",
    ja: "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  };

  //
  // states
  //
  let open: boolean = $state(false);

  //
  // event handlers
  //
  const toggleMenu = (evt: MouseEvent): void => {
    open = (evt.target as HTMLInputElement)?.checked;
  };
  const closeMenu = (): void => {
    open = false;
  };
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

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

<div>
  <input id="menu-switch" type="checkbox" checked={open} style="display: none;" onclick={toggleMenu} />
  <label class="menu__icon" for="menu-switch">
    <div class="menu__icon-line"></div>
    <div class="menu__icon-line"></div>
    <div class="menu__icon-line"></div>
  </label>
  <nav class="menu__nav">
    <div class="menu__nav-padding">
      <ul class="menu__items">
        <li class="menu__item">
          <a href={localizeHref("/about")}>{ m.about() }</a>
        </li>
        <li class="menu__item">
          <a href={localizeHref("/opendata")}>{ m.opendata() }</a>
        </li>
        <li class="menu__item">
          <a href={localizeHref("/history")}>{ m.history() }</a>
        </li>
      </ul>

      <h2 class="menu__languages-title">
        Languages
      </h2>
      <div class="menu__languages-list">
        {#each locales as locale, index (index) }
          <button
            onclick={() => setLocale(locale)}
            class="menu__languages-item"
          >
            { langNames[locale] }
          </button>
        {/each}
      </div>

      <div class="menu__bottomline">
        <a href="https://github.com/xicri?tab=repositories" target="_blank" rel="noopener">GitHub</a>
        <a href="https://bsky.app/profile/xicri.genshin-dictionary.com" target="_blank" rel="noopener">Bluesky</a>
        <a href="https://focalorus.io/@xicri" target="_blank" rel="noopener">Misskey</a>
      </div>
    </div>
  </nav>
  <ClosingLayer enabled={open} onclose={closeMenu} />
</div>
