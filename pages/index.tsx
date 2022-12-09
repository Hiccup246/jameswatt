import Head from "next/head";
import Script from "next/script";
import IntroSection from "../components/sections/IntroSection";
import AboutMeSection from "../components/sections/AboutMeSection";
import WorkExperienceSection from "../components/sections/WorkExperienceSection";
import ProjectShowcaseSection from "../components/sections/ProjectShowcaseSection";
import BookshelfSection from "../components/sections/BookshelfSection";
import CreditsSection from "../components/sections/CreditsSection";
import FooterSection from "../components/sections/FooterSection";
import TechnologiesSection from "../components/sections/TechnologiesSection";
import { BOOKS } from "../constants/Books";
import TechnologySectionTwo from "../components/sections/TechnologySectionTwo";
import BookshelfSectionTwo from "../components/sections/BookshelfSectionTwo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>James Watt</title>
        <meta
          name="description"
          content="`The personal portfolio for London based software engineer James Watt."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        {/* <meta httpEquiv="refresh" content="10;url='https://www.jameswatt.io'" /> */}
        <meta
          name="keywords"
          content="james watt, software engineer, software developer, james watt developer, james watt software developer, james watt programmer, james watt coder, james watt dev, james watt tech"
        />
        <link rel="canonical" href="https://www.jameswatt.io" />
        <link href="https://www.jameswatt.io" rel="author" />

        {/* Essential META Tags */}
        <meta property="og:title" content="James Watt Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="xxx" />
        <meta property="og:url" content="http://www.jameswatt.io" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Non-Essential, But Recommended */}
        <meta
          property="og:description"
          content="Portfolio of Software Engineer James Watt"
        />
        <meta property="og:site_name" content="James Watt Portfolio" />
        <meta name="twitter:image:alt" content="xxx" />

        {/* Non-Essential, But Required for Analytics */}
        <meta name="twitter:site" content="@jameswattnz" />
      </Head>

      <Script
        id="themeLoader"
        strategy="beforeInteractive"
        async
        src="./themeLoader.js"
      />

      {/* Umami Analytics Script */}
      <Script
        id="analytics"
        strategy="beforeInteractive"
        async
        defer
        data-website-id={process.env.UMAMI_WEBSITE_ID}
        src={process.env.UMAMI_WEBSITE_URL}
      />

      <IntroSection />
      <WorkExperienceSection />
      <ProjectShowcaseSection />
      <TechnologiesSection />
      {/* <TechnologySectionTwo /> */}
      <AboutMeSection />
      <BookshelfSection books={BOOKS} />
      {/* <BookshelfSectionTwo /> */}
      <CreditsSection />
      <FooterSection />
    </div>
  );
}
