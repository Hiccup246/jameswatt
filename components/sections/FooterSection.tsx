import NextJsIcon from "../Icons/NextJsIcon";
import SectionLayout from "../layouts/SectionLayout";
import ThemeToggle from "../ThemeToggle";

export default function FooterSection() {
  return (
    <SectionLayout noBottomPadding>
      <div className="grid grid-cols-1 text-center text-sm md:grid-cols-3">
        <div className="mb-6 flex justify-center md:mb-0">
          <h1 className="mr-1.5">Created with</h1>

          <a
            className="h-auto w-14 pt-1"
            href="https://nextjs.org/"
            aria-label="Next.js Homepage"
          >
            <NextJsIcon />
          </a>
        </div>

        <a
          href="https://github.com/Hiccup246/jameswatt"
          className="mb-6 hover:underline md:mb-0"
        >
          Designed & Built by James Watt
        </a>

        <ThemeToggle />
      </div>
    </SectionLayout>
  );
}
