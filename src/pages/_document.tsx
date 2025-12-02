import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="google-site-verification" content="fPZCIib8QFE52LeBEGqBoapTwL6v9vqHl9lKqcreMDQ" />

        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@xicri_gi" />
        <meta name="twitter:creator" content="@xicri_gi" />

        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
        { process.env.SERVER_ENV === "production" ? (
          <script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "1f401150384f4aaa9d14b208aac9fdba"}'
            defer
          ></script>
        ) : "" }
      </body>
    </Html>
  );
}
