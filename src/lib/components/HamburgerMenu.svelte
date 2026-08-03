<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import { localizeHref, setLocale } from "$lib/paraglide/runtime.js";
  import { supportedLocales } from "../../app.config.ts";

  const langNames = {
    en: "English",
    ja: "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  };

  let menu: HTMLDialogElement | undefined = $state();
</script>

<style lang="scss">
@use "$lib/styles/variables.scss" as vars;

li {
  list-style: none;
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
    visibility: visible;
    position: fixed;
    top: 0;
    right: 0;

    width: 240px;
    height: 100vh;

    transition: width 300ms, visibility 300ms;

    background-color: white;
    box-shadow: -5px 0 5px #c0c0c0;

    z-index: 15;
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

  &__bottomline {
    display: flex;
    column-gap: 1.5em;
    font-size: 0.7rem;
  }
}
</style>

  <dialog id="hamburger-menu" bind:this={menu} class="menu__nav">
    <form method="dialog">
      <nav class="menu__nav-padding">
        <ul class="menu__items">
          <li class="menu__item">
            <a href={localizeHref("/about")} class="no-underline hover:underline">{ m.about() }</a>
          </li>
          <li class="menu__item">
            <a href={localizeHref("/opendata")} class="no-underline hover:underline">{ m.opendata() }</a>
          </li>
          <li class="menu__item">
            <a href={localizeHref("/history")} class="no-underline hover:underline">{ m.history() }</a>
          </li>
        </ul>

        <h2 class="menu__languages-title">
          Languages
        </h2>
        <div class="flex flex-col gap-y-2 pl-6 mb-8">
          {#each supportedLocales as locale, index (index) }
            <button
              onclick={() => setLocale(locale)}
              class="text-dark cursor-pointer text-left"
              data-testid={`locale-switch-${ locale }`}
            >
              { langNames[locale] }
            </button>
          {/each}
        </div>

        <div class="menu__bottomline mb-2.5">
          <a href="https://github.com/xicri?tab=repositories" target="_blank" rel="noopener">GitHub</a>
        </div>

        <p class="text-xs">
          This is an unofficial fan-made website. <br />
          Copyright &copy; 2021-present Xicri & the Genshin Dictionary contributors<br />
          Genshin Impact is a registered trademark of miHoYo, Inc., COGNOSPHERE PTE. LTD., and their affiliated subsidiaries.
        </p>
      </nav>
    </form>
  </dialog>
