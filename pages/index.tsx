import Head from "next/head";
import LandingSection from "../components/LandingSection";
import styles from "../styles/Home.module.css";
import AboutMeSection from "../components/AboutMeSection";
import WorkExperienceSection from "../components/WorkExperienceSection/WorkExperienceSection";

export default function Home() {
  return (
    <div className={styles.container}>
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

      <div>
        <LandingSection />
        <AboutMeSection />
        <WorkExperienceSection />
      </div>
    </div>
  );
}
