import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.jameswatt.io" />
        <link href="https://www.jameswatt.io/" rel="publisher" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
        <Script
          id="themeLoader"
          strategy="beforeInteractive"
          async
          src="./themeLoader.js"
        />
        <Script
          id="umami-analytics-script"
          strategy="beforeInteractive"
          async
          defer
          data-website-id={process.env.UMAMI_WEBSITE_ID}
          src={process.env.UMAMI_WEBSITE_URL}
        />
      </body>
    </Html>
  );
}
