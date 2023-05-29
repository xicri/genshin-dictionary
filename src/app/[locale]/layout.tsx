import Link from "next/link";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { Spacer } from "@/components/Spacer";
import { I18n } from "@/libs/i18n";
import { locales } from "@/config";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { Locale } from "@/types";

type Props = {
  children: ReactNode,
  params: { locale: Locale };
};

export async function generateMetaData({ params: { locale }}: Props): Promise<Metadata> {
  //
  // i18n
  //
  const i18n = new I18n(locale);

  return {
    title: {
      template: `%s | ${i18n.t("siteTitle")}`,
      absolute: i18n.t("siteTitle"), // Fallback
    },
    openGraph: {
      siteName: i18n.t("siteTitle"),
      type: "website",
    },
    twitter: {
      card: "summary",
      site: "@xicri_gi",
      creator: "@xicri_gi",
    },
    verification: {
      google: "fPZCIib8QFE52LeBEGqBoapTwL6v9vqHl9lKqcreMDQ", // google-site-verification
    },
    icons: "/images/favicon.svg",
    robots: process.env.SERVER_ENV === "production" ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false },
  };
}

export async function generateStaticParams(): Promise<{ locale: Locale; }[]> {
  return locales.map(locale => ({ locale }));
}

export default function Layout({ children, params: { locale }}: Props): JSX.Element {
  const i18n = new I18n(locale, {
    en: {
      siteTitle: "Genshin Dictionary",
    },
    ja: {
      siteTitle: "原神 英語・中国語辞典",
    },
    "zh-CN": {
      siteTitle: "原神中英日辞典",
    },
  });

  return (
    <html lang={locale}>
      <head>
        <style jsx>{`
          @use "_variables.scss" as vars;

          $hide-title-width: 336px;

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
              font-weight: 300;
              font-size: 32px;
              color: vars.$color-dark;
              letter-spacing: 1px;
              white-space: nowrap;

              @media (max-width: vars.$mobile-width) { // Mobile
                font-size: 7vw;
              }

              @media (max-width: $hide-title-width) { // Too small to display site title
                display: none;
              }
            }

            &__logo {
              display: none;

              @media (max-width: $hide-title-width) { // Too small to display site title
                display: inline;
              }
            }
          }
        `}</style>
      </head>
      <body>
        <div>
          <div className="layout-default__nav-wrapper">
            <nav className="layout-default__nav">
              <h1>
                <Link href="/">
                  <img src="/images/favicon.svg" alt={ i18n.t("siteTitle") } width="48" height="48" className="layout-default__logo" decoding="async" />
                  <span className="layout-default__title">{ i18n.t("siteTitle") }</span>
                </Link>
              </h1>

              <Spacer />
              <HamburgerMenu locale={locale} />
            </nav>
          </div>

          {children}

          { process.env.SERVER_ENV === "production" ? (
            <script
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon='{"token": "1f401150384f4aaa9d14b208aac9fdba"}'
              defer
            ></script>
          ) : "" }
        </div>
      </body>
    </html>
  );
}
