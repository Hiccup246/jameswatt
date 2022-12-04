import BrittanyChiangIcon from "../Icons/BrittanyChiangIcon";
import FontAwesomeIcon from "../Icons/FontAwesomeIcon";
import Icons8Icon from "../Icons/Icons8Icon";
import SectionLayout from "../layouts/SectionLayout";
import Image from "next/image";
import FreshIcon from "../Icons/FreshIcon";
import NuxtIcon from "../Icons/NuxtIcon";
import Marguerite from "../../public/marguerite.webp";
import JoshComeau from "../../public/josh-comeau.webp";

export default function CreditsSection() {
  return (
    <SectionLayout isBgColorPrimary={false}>
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
              className="transition-opacity-transform mb-1 inline-block h-4 w-4 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
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
              className="transition-opacity-transform mb-1 inline-block h-4 w-4 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
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
              className="transition-opacity-transform mb-2 inline-block h-4 w-4 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
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
              className="transition-opacity-transform relative mb-1 inline-block h-6 w-6 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
              href="https://marguerite.io/"
              aria-label="Marguerite Roth Website"
            >
              <Image
                src={Marguerite}
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
              className="transition-opacity-transform mb-1 inline-block h-6 w-6 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
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
              className="transition-opacity-transform relative mb-1 inline-block h-6 w-6 translate-x-[-8px] -rotate-45 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
              href="https://www.joshwcomeau.com/"
              aria-label="Josh Comeau Website"
            >
              <Image
                src={JoshComeau}
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
              className="transition-opacity-transform inline-block h-6 w-6 translate-x-[-8px] -rotate-45 pt-1 align-middle opacity-0 duration-500 ease-in-out group-hover:transform-none group-hover:opacity-70"
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
