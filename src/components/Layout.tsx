import Link from "next/link";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { Spacer } from "@/components/Spacer";
import { setupI18n } from "@/libs/i18n";
import type { ReactNode } from "react";
import type { Locale } from "@/types";

type Props = {
  children: ReactNode,
  locale: Locale,
};

export function Layout({ children, locale }: Props): JSX.Element {
  //
  // i18n
  //
  const t = setupI18n(locale, {
    en: {
      siteTitleL1: "Genshin",
      siteTitleL2: "Dictionary",
    },
    ja: {
      siteTitleL1: "原神 英語・",
      siteTitleL2: "中国語辞典",
    },
    "zh-CN": {
      siteTitleL1: "原神",
      siteTitleL2: "中英日辞典",
    },
  });

  return (
    <div>
      <style jsx>{`
        @use "_variables.scss" as vars;

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

          &__title-wrapper {
            display: flex;
            flex-wrap: wrap;
          }

          &__title {
            font-weight: 300;
            font-size: 32px;
            color: vars.$color-dark;
            letter-spacing: 1px;
            white-space: nowrap;
          }
        }
      `}</style>

      <div className="layout-default__nav-wrapper">
        <nav className="layout-default__nav">
          <h1>
            <Link href="/" className="layout-default__title-wrapper">
              <span className="layout-default__title">{ t("siteTitleL1") }</span>
              <span className="layout-default__title">{ t("siteTitleL2") }</span>
            </Link>
          </h1>

          <Spacer />
          <HamburgerMenu locale={locale} />
        </nav>
      </div>

      {children}
    </div>
  );
}
