import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClosingLayer } from "@/components/ClosingLayer";
import { I18n, validateLocale } from "@/libs/i18n";
import type { ChangeEvent } from "react";
import type { Locale } from "@/types";

type Props = {
  locale: Locale,
};

export function HamburgerMenu({ locale }: Props): JSX.Element {
  const { locales } = useRouter();
  const [ open, setOpen ] = useState(false);

  //
  // event handlers
  //
  const toggleMenu = (evt: ChangeEvent<HTMLInputElement>): void => {
    setOpen(evt.target.checked);
  };
  const closeMenu = (): void => {
    setOpen(false);
  };

  //
  // i18n
  //
  const i18n = new I18n(locale, {
    en: {
      about: "About",
      opendata: "Opendata / API",
      history: "History",
      translate: "Genshin Machine Translate (Japanese)",
    },
    ja: {
      about: "このサイトについて",
      opendata: "オープンデータ・API",
      history: "更新履歴",
      translate: "原神 自動翻訳",
    },
    "zh-CN": {
      about: "关于",
      opendata: "开放数据 · API",
      history: "更新记录",
      translate: "原神机器翻译（日语）",
    },
  });

  //
  // Methods
  //
  const localeToLocaleName = (loc: Locale): string => {
    if (loc === "en") {
      return "English";
    } else if (loc === "ja") {
      return "日本語";
    } else if (loc === "zh-CN") {
      return "简体中文";
    } else {
      throw new Error(`Unexpected locale "${loc}".`);
    }
  };

  return (
    <div>
      <style jsx>{`
        @use "_variables.scss" as vars;

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

          &__extlink {
            margin-left: 0.25em;
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
      `}</style>
      <input id="menu-switch" type="checkbox" checked={open} style={{ display: "none" }} onChange={toggleMenu} />
      <label className="menu__icon" htmlFor="menu-switch">
        <div className="menu__icon-line"></div>
        <div className="menu__icon-line"></div>
        <div className="menu__icon-line"></div>
      </label>
      <nav className="menu__nav">
        <div className="menu__nav-padding">
          <ul className="menu__items">
            <li className="menu__item">
              <Link href="/about/">{ i18n.t("about") }</Link>
            </li>
            <li className="menu__item">
              <Link href="/opendata/">{ i18n.t("opendata") }</Link>
            </li>
            <li className="menu__item">
              <Link href="/history/">{ i18n.t("history") }</Link>
            </li>
            <li className="menu__item">
              <a href="https://translate.genshin-dictionary.com" target="_blank" rel="noopener">{ i18n.t("translate") }</a>
              <img src="/vendor/octicons/link-external.svg" alt="" decoding="async" width="14" height="14" className="menu__extlink" />
            </li>
          </ul>

          <h2 className="menu__languages-title">
            Languages
          </h2>
          <div className="menu__languages-list">
            { locales?.filter(loc => loc !== "default")
              .map(_loc => {
                const loc = validateLocale(_loc);

                return (
                  <Link
                    href="#" // Check if there is a way to avoid appending #
                    key={loc}
                    className="menu__languages-item"
                    locale={loc}
                  >
                    { localeToLocaleName(loc) }
                  </Link>
                );
              })
            }
          </div>

          <div className="menu__bottomline">
            <a href="https://github.com/xicri?tab=repositories" target="_blank" rel="noopener">GitHub</a>
            <a href="https://twitter.com/xicri_gi" target="_blank" rel="noopener">Twitter</a>
          </div>
        </div>
      </nav>
      <ClosingLayer enabled={open} onClose={closeMenu} />
    </div>
  );
}
