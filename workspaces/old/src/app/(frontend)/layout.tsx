import type { Metadata } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import React from "react";

import { draftMode } from "next/headers";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { Providers } from "@/providers";
import { Header } from "@/Header/Component";
import { Footer } from "@/Footer/Component";
import { AdminBar } from "@/components/AdminBar";
import { cn } from "@/utilities/ui";

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const { isEnabled } = await draftMode();

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
