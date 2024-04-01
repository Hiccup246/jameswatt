import "../styles/globals.css";
import "../styles/reset.css";
import { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";
import ThemeProvider from "../components/ThemeProvider";
import Script from "next/script";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  applicationName: "James Watt Portfolio",
  creator: "James Watt",
  publisher: "James Watt",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.jameswatt.io",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brown dark:bg-darkgrey">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
      {/* <Script
        id="themeLoader"
        strategy="beforeInteractive"
        src="./themeLoader.js"
      /> */}
      <Script
        id="umami-analytics-script"
        strategy="lazyOnload"
        data-website-id={process.env.UMAMI_WEBSITE_ID}
        src={process.env.UMAMI_WEBSITE_URL}
      />
    </html>
  );
}
