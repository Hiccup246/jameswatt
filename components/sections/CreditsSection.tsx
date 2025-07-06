import BrittanyChiangIcon from "../Icons/BrittanyChiangIcon";
import FontAwesomeIcon from "../Icons/FontAwesomeIcon";
import Icons8Icon from "../Icons/Icons8Icon";
import SectionLayout from "../layouts/SectionLayout";
import Image from "next/image";
import FreshIcon from "../Icons/FreshIcon";
import NuxtIcon from "../Icons/NuxtIcon";

export default function CreditsSection() {
  const iconAnimation =
    "transition-all inline-block h-4 w-4 translate-x-[-8px] group-hover:translate-x-0 group-hover:-rotate-0 -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:opacity-70";
  const iconAnimationLarge =
    "transition-all relative inline-block h-6 w-6 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:-rotate-0 group-hover:translate-x-0 group-hover:opacity-70";

  return (
    <SectionLayout bgSecondary>
      <h1 className="text-center text-2xl font-bold sm:text-3xl">
        The Work Which Inspired This Site
      </h1>

      <h2 className="mb-16 text-center">
        &quot;Good artists borrow, great artists steal&quot; - Pablo Picasso
      </h2>

      <div className="text-center">
        <ul>
          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://icons8.com/"
              aria-label="Icons8 Homepage"
            >
              Icons8 (Icons)
            </a>

            <a
              className={`${iconAnimation} mb-1`}
              href="https://icons8.com/"
              aria-label="Icons8 Homepage"
            >
              <Icons8Icon />
            </a>
          </li>

          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://fontawesome.com/"
              aria-label="Font Awesome Homepage"
            >
              Font Awesome (Icons)
            </a>

            <a
              className={`${iconAnimation} mb-1`}
              href="https://fontawesome.com/"
              aria-label="Font Awesome Homepage"
            >
              <FontAwesomeIcon />
            </a>
          </li>

          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://brittanychiang.com/"
              aria-label="Brittany Chiang Website"
            >
              Brittany Chiang (Inspired the programming experience component)
            </a>

            <a
              className={`${iconAnimation} mb-2`}
              href="https://brittanychiang.com/"
              aria-label="Brittany Chiang Website"
            >
              <BrittanyChiangIcon />
            </a>
          </li>

          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://marguerite.io/"
              aria-label="Marguerite Roth Website"
            >
              Marguerite Roth (Inspired the bookshelf component)
            </a>

            <a
              className={`${iconAnimationLarge} mb-1`}
              href="https://marguerite.io/"
              aria-label="Marguerite Roth Website"
            >
              <Image
                src={"/marguerite.webp"}
                fill
                sizes="24px"
                alt="Marguerite Roth Icon"
              />
            </a>
          </li>

          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://fresh.deno.dev/"
              aria-label="Fresh Framework Homepage"
            >
              Fresh Framework (Dripping Design + Project Showcase)
            </a>

            <a
              className={`${iconAnimationLarge} mb-1`}
              href="https://fresh.deno.dev/"
              aria-label="Fresh Framework Homepage"
            >
              <FreshIcon />
            </a>
          </li>

          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://www.joshwcomeau.com/"
              aria-label="Josh Comeau Website"
            >
              Josh Comeau (Moon Icon)
            </a>

            <a
              className={`${iconAnimationLarge} mb-1`}
              href="https://www.joshwcomeau.com/"
              aria-label="Josh Comeau Website"
            >
              <Image
                src={"/josh-comeau.webp"}
                fill
                sizes="24px"
                alt="Josh Comeau Icon"
              />
            </a>
          </li>

          <li className="hover group mb-5">
            <a
              className="pr-2 group-hover:underline"
              href="https://nuxt.com/"
              aria-label="Nuxt Framework Homepage"
            >
              Nuxt Framework (Technologies Section)
            </a>

            <a
              className={`${iconAnimationLarge} pt-1`}
              href="https://nuxt.com/"
              aria-label="Nuxt Framework Homepage"
            >
              <NuxtIcon />
            </a>
          </li>
        </ul>
      </div>
    </SectionLayout>
  );
}
