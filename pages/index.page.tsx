import Head from "next/head";
import IntroSection from "../components/sections/IntroSection";
import AboutMeSection from "../components/sections/AboutMeSection";
import WorkExperienceSection from "../components/sections/WorkExperienceSection";
import ProjectShowcaseSection from "../components/sections/ProjectShowcaseSection";
import BookshelfSection from "../components/sections/BookshelfSection";
import CreditsSection from "../components/sections/CreditsSection";
import FooterSection from "../components/sections/FooterSection";
import TechnologiesSection from "../components/sections/TechnologiesSection";

export default function Home() {
  return (
    <div>
      <Head>
        <title>James Watt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="`The personal portfolio for London based software engineer James Watt."
        />
        <meta
          name="keywords"
          content="james watt, software engineer, software developer, james watt developer, james watt software developer, james watt programmer, james watt coder, james watt dev, james watt tech"
        />
        <link href="https://www.jameswatt.io" rel="author" />

        {/* Open Graph META Tags */}
        <meta property="og:title" content="James Watt" />
        <meta
          property="og:description"
          content="Portfolio of Software Engineer James Watt"
        />
        <meta property="og:site_name" content="James Watt Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/site-screenshot.webp" />
        <meta property="og:image:width" content="2880" />
        <meta property="og:image:height" content="1572" />
        <meta
          property="og:image:alt"
          content="Screenshot of www.jameswatt.io"
        />
        <meta property="og:url" content="http://www.jameswatt.io" />

        {/* Twitter META Tags */}
        <meta name="twitter:title" content="James Watt" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Portfolio of Software Engineer James Watt"
        />
        <meta name="twitter:creator" content="@jameswattnz" />
        <meta name="twitter:site" content="@jameswattnz" />
        <meta name="twitter:image" content="/site-screenshot.webp" />
        <meta
          name="twitter:image:alt"
          content="Screenshot of www.jameswatt.io"
        />
      </Head>

      <IntroSection />
      <WorkExperienceSection />
      <ProjectShowcaseSection />
      <TechnologiesSection />
      <AboutMeSection />
      <BookshelfSection />
      <CreditsSection />
      <FooterSection />
    </div>
  );
}
