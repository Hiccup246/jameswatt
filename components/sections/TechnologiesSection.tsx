import SectionLayout from "../layouts/SectionLayout";
import { GROUP1, GROUP2, GROUP3 } from "../../constants/TechnologyIcons";

export default function TechnologiesSection() {
  function slideIcon(technologyIcon: TechnologyIcon) {
    return (
      <div className="slide relative h-[100px] w-[var(--slider-item-width)]">
        <div className="hover group relative h-[86px] w-[86px] duration-150 hover:-translate-y-0.5 hover:shadow-md">
          <a
            href={technologyIcon.link}
            aria-label={technologyIcon.name}
            title={technologyIcon.name}
            className="relative z-20 mt-1 flex h-full w-full items-center justify-center rounded-md border border-lightgrey bg-white group-hover:border-0"
          >
            <div className="flex h-12 w-12 justify-center">
              <title>{technologyIcon.name}</title>

              {technologyIcon.icon}
            </div>
          </a>

          <div
            className={`
                            group-hover:animation-play absolute
                            top-0 left-0
                            z-10 h-[calc(100%+2px)]
                            w-[calc(100%+2px)] -translate-x-px -translate-y-px rounded-lg bg-tech-icon-gradient
                            opacity-0 transition-all duration-300 ease-linear
                            group-hover:animate-rotate group-hover:opacity-100
                         `}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <SectionLayout>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Technologies I Dabble With
      </h1>

      <div className="container relative w-full overflow-hidden">
        <div className="relative m-auto h-24 w-full">
          <div className="slide-track hover:animation-pause flex w-[calc(var(--slider-item-width)*var(--all-slider-items))] animate-scroll">
            {[...GROUP1, ...GROUP1].map((technologyIcon, index) => {
              return (
                <div key={technologyIcon.name + index}>
                  {slideIcon(technologyIcon)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative m-auto h-24 w-full">
          <div className="slide-track hover:animation-pause flex w-[calc(var(--slider-item-width)*var(--all-slider-items))] animate-scroll-reverse">
            {[...GROUP2, ...GROUP2].map((technologyIcon, index) => {
              return (
                <div key={technologyIcon.name + index}>
                  {slideIcon(technologyIcon)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative m-auto h-24 w-full">
          <div className="slide-track hover:animation-pause flex w-[calc(var(--slider-item-width)*var(--all-slider-items))] animate-scroll">
            {[...GROUP3, ...GROUP3].map((technologyIcon, index) => {
              return (
                <div key={technologyIcon.name + index}>
                  {slideIcon(technologyIcon)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="to-transparent absolute top-0 left-0 h-full w-5 bg-gradient-to-r from-white via-white dark:from-black sm:w-[50px] md:w-[100px] lg:w-[100px]"></div>
        <div className="to-transparent absolute top-0 right-0 h-full w-5 bg-gradient-to-l from-white via-white dark:from-black sm:w-[50px] md:w-[100px] lg:w-[100px]"></div>
      </div>
    </SectionLayout>
  );
}
