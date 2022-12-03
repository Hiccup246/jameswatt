import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { Roboto, Open_Sans } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const openSans = Open_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-open-sans",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} ${openSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
