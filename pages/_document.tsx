import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="themeLoader" strategy="beforeInteractive" async src="./themeLoader.js" />
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
  )
}