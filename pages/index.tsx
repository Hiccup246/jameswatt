import Head from "next/head";
import Script from "next/script";
import LandingSection from "../components/LandingSection";
import AboutMeSection from "../components/AboutMeSection";
import WorkExperienceSection from "../components/WorkExperienceSection/WorkExperienceSection";
import ProjectShowcaseSection from "../components/ProjectShowcaseSection";
import BookshelfSection from "../components/BookshelfSection/BookshelfSection";
import CreditsSection from "../components/CreditsSection";
import FooterSection from "../components/FooterSection";
import TechnologiesSection from "../components/TechnologiesSection";

export default function Home() {
  return (
    <div>
      <Head>
        <title>James Watt</title>
        <meta name="description" content="`The personal portfolio for London based software engineer James Watt." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        {/* <meta httpEquiv="refresh" content="10;url='https://www.jameswatt.io" /> */}
        <meta name="keywords" content="james watt, software engineer, software developer, james watt tech, james watt software developer, james watt programmer" />
        <link rel="canonical" href="https://www.jameswatt.io" />
        <link href="https://www.jameswatt.io" rel="author" />

        {/* Essential META Tags */}
        <meta property="og:title" content="James Watt Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="xxx" />
        <meta property="og:url" content="http://www.jameswatt.io" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Non-Essential, But Recommended */}
        <meta property="og:description" content="Portfolio of Software Developer James Watt" />
        <meta property="og:site_name" content="James Watt Portfolio" />
        <meta name="twitter:image:alt" content="xxx" />

        {/* Non-Essential, But Required for Analytics */}
        <meta name="twitter:site" content="@jameswattnz" />
      </Head>

      <Script id="themeLoader">
        {`
          // On page load or when changing themes, best to add inline in head to avoid FOUC
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        `}
      </Script>

      <div>
        <LandingSection />
        <WorkExperienceSection />
        <ProjectShowcaseSection />
        <TechnologiesSection />
        <AboutMeSection />
        <BookshelfSection />
        <CreditsSection />
      </div>
      
      <FooterSection />
    </div>
  );
}
