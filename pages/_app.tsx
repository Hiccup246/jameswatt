import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google"

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
