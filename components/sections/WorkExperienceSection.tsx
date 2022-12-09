import { useEffect, useState, useRef } from "react";

import TabButton from "../TabButton";
import ExperiencePanel from "../ExperiencePanel";
import SectionLayout from "../layouts/SectionLayout";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const tailwindScreenBreakpoints = resolveConfig(tailwindConfig)?.theme
  ?.screens as { small: string };
const mobileViewWidth: string =
  (tailwindScreenBreakpoints && tailwindScreenBreakpoints.small) || "550px";

export function largestChildHeight(elem: HTMLDivElement): number {
  const elementChildren: Element[] = Array.from(elem.children);

  if (elementChildren.length == 0) return 1000;

  let largestChildHeight: number = 0;

  elementChildren.forEach((child) => {
    if (child.clientHeight > largestChildHeight)
      largestChildHeight = child.clientHeight;
  });

  return largestChildHeight;
}

export function calcTabButtonTranslation(x: number, y: number) {
  const isMobile = window.matchMedia(`(max-width: ${mobileViewWidth})`).matches;

  if (isMobile) {
    // If the device is a mobile the tabs are horizontal
    return `translateX(calc(${x}px))`;
  } else {
    // If the device is a tablet or dekstop then the tabs are vertical
    return `translateY(calc(${y}px)`;
  }
}

export default function WorkExperienceSection({ jobs }: { jobs: Job[] }) {
  const experiencePanelsWrapper = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [sliderStyle, setSliderStyle] = useState<
    | {
        width: string;
        transform: string;
        height: string;
      }
    | {}
  >({ transform: "translateY(calc(10px)" });

  function clickOnTabButton(index: number, button: HTMLButtonElement): void {
    const isMobile = window.matchMedia(`(max-width: ${mobileViewWidth})`).matches;

    setCurrentTabIndex(index);
    setSliderStyle({
      width: button.offsetWidth.toString() + "px",
      height: isMobile ? "2px" : button.offsetHeight.toString() + "px",
      transform: calcTabButtonTranslation(button.offsetLeft, button.offsetTop),
    });
  }

  function resize() {
    setWidth(document.body.clientWidth);
  }

  useEffect(() => {
    // The largest panel is not know till after rendering. As a result to ensure content
    // does not spill over the section and to not dynamically resize (which moves/pushes other components around)
    // we need to manually determine the max height and set it
    if (experiencePanelsWrapper.current) {
      experiencePanelsWrapper.current.style.height = `${largestChildHeight(
        experiencePanelsWrapper.current
      )}px`;
    }
  }, [width]);

  useEffect(() => {
    globalThis.addEventListener("resize", resize);
    resize();

    return () => {
      globalThis.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <SectionLayout>
      <h1 className="my-16 text-center text-2xl font-bold sm:text-3xl">
        My Experience
      </h1>

      <div className="flex w-full max-small:block">
        <div
          className={`
               relative z-10 m-0 h-fit w-max list-none py-2.5 max-small:py-0 flex flex-col gap-6 max-small:gap-0
               max-small:flex max-small:flex-row max-small:w-full max-small:overflow-y-hidden max-small:overflow-x-scroll
        `}
        >
          {jobs.map((job: Job, index: number) => {
            return (
              <TabButton
                key={index + job.company}
                companyName={job.company}
                activated={index === currentTabIndex}
                clickHandler={(button: HTMLButtonElement) =>
                  clickOnTabButton(index, button)
                }
              />
            );
          })}
          <div
            style={sliderStyle}
            className={`
              transition-[transform width] ease-[cubic-bezier(0.645, 0.045, 0.355, 1)]
              visible absolute top-0 left-0
              z-10 w-[85px]
              rounded bg-brown delay-100
              duration-200 max-small:top-auto max-small:bottom-0 max-small:z-20
              h-[40px]
            `}
          ></div>
          <div
            className={`
            visible absolute top-0 left-0 ml-1 h-full
            w-0.5 rounded-sm
            bg-black max-small:hidden
          `}
          />
        </div>

        <div
          className="relative ml-5 w-full max-small:ml-0"
          ref={experiencePanelsWrapper}
        >
          {jobs.map((job: Job, index: number) => {
            return (
              <ExperiencePanel
                key={index + job.dateRange}
                job={job}
                activated={index === currentTabIndex}
              />
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
}
