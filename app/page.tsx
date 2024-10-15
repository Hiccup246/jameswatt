import { Metadata } from "next";
import IntroSection from "../components/sections/IntroSection";
import WorkExperienceSection from "../components/sections/WorkExperienceSection";
import ProjectShowcaseSection from "../components/sections/ProjectShowcaseSection";
import TechnologiesSection from "../components/sections/TechnologiesSection";
import AboutMeSection from "../components/sections/AboutMeSection";
import FooterSection from "../components/sections/FooterSection";
import CreditsSection from "../components/sections/CreditsSection";
import BookshelfSection from "../components/sections/BookshelfSection";

export const metadata: Metadata = {
  title: "James Watt",
  description:
    "The personal portfolio of London based software engineer James Watt",
  keywords: [
    "james watt",
    "software engineer",
    "software developer",
    "james watt developer",
    "james watt software developer",
    "james watt programmer",
    "james watt coder",
    "james watt dev",
    "james watt tech",
  ],
  openGraph: {
    title: "James Watt",
    description: "Portfolio of Software Engineer James Watt",
    url: "http://www.jameswatt.io",
    siteName: "James Watt",
    images: [
      {
        url: "http://www.jameswatt.io/site-screenshot.webp",
        width: 2880,
        height: 1572,
        alt: "Screenshot of www.jameswatt.io",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Watt",
    description: "Portfolio of Software Engineer James Watt",
    creator: "@jameswattnz",
    site: "@jameswattnz",
    images: {
      url: "https://www.jameswatt.io/site-screenshot.webp",
      alt: "Screenshot of www.jameswatt.io",
    },
  },
};

// ToDo: Uncomment when ready to lazy load
// import dynamic from "next/dynamic";
// const IntroSection = dynamic(
//   () => import("../components/sections/IntroSection")
// );
// const WorkExperienceSection = dynamic(
//   () => import("../components/sections/WorkExperienceSection")
// );
// const ProjectShowcaseSection = dynamic(
//   () => import("../components/sections/ProjectShowcaseSection")
// );
// const TechnologiesSection = dynamic(
//   () => import("../components/sections/TechnologiesSection")
// );
// const AboutMeSection = dynamic(
//   () => import("../components/sections/AboutMeSection")
// );
// const BookshelfSection = dynamic(
//   () => import("../components/sections/BookshelfSection")
// );
// const CreditsSection = dynamic(
//   () => import("../components/sections/CreditsSection")
// );
// const FooterSection = dynamic(
//   () => import("../components/sections/FooterSection")
// );

export default function HomePage() {
  return (
    <main>
      <IntroSection />
      <WorkExperienceSection />
      <ProjectShowcaseSection />
      <TechnologiesSection />
      <AboutMeSection />
      <BookshelfSection />
      <CreditsSection />
      <FooterSection />
    </main>
  );
}
