import { useEffect, useState, useRef } from "react";

import { PROGRAMMING_EXPERIENCES } from "../../constants/WorkExperiences";
import TabButton from "../TabButton";
import ExperiencePanel from "../ExperiencePanel";
import SectionLayout from "../layouts/SectionLayout";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const tailwindScreenBreakpoints = resolveConfig(tailwindConfig)?.theme
  ?.screens as { small: string };
const mobileViewWidth: string =
  (tailwindScreenBreakpoints && tailwindScreenBreakpoints.small) || "550px";

function largestExperiencePanelHeight(elem: HTMLDivElement): number {
  // The largest panel is not know till after rendering. As a result to ensure content
  // does not spill over the section and to not dynamically resize (which moves/pushes other components around)
  // we need to manually determine the max height and set it
  const experiencePanels: NodeListOf<HTMLElement> | undefined =
    elem?.querySelectorAll(".experience-panel");

  if (!experiencePanels) return 1000;

  let largestPanelHeight: number = 0;

  experiencePanels.forEach((panel) => {
    if (panel.clientHeight > largestPanelHeight)
      largestPanelHeight = panel.clientHeight;
  });

  return largestPanelHeight;
}

function calcTabButtonTranslation(index: number) {
  const isMobile = window.matchMedia(`(max-width: ${mobileViewWidth})`).matches;

  if (isMobile) {
    // If the device is a mobile the tabs are horizontal
    const selectedButtonXPosition = `${index} * var(--tab-width)`;
    return `translateX(calc(${selectedButtonXPosition}))`;
  } else {
    // If the device is a tablet or dekstop then the tabs are vertical
    const selectedButtonYPosition = `(${index} * var(--tab-height)) + (${index} * var(--tab-margin-top))`;
    return `translateY(calc(${selectedButtonYPosition})`;
  }
}

export default function WorkExperienceSection() {
  const experiencePanelsWrapper = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [sliderStyle, setSliderStyle] = useState<
    | {
        width: string;
        transform: string;
      }
    | {}
  >({});

  function clickOnTabButton(index: number, button: HTMLButtonElement): void {
    setCurrentTabIndex(index);
    setSliderStyle({
      width: button.offsetWidth.toString() + "px",
      transform: calcTabButtonTranslation(index),
    });
  }

  function resize() {
    setWidth(document.body.clientWidth);
  }

  useEffect(() => {
    if (experiencePanelsWrapper.current) {
      experiencePanelsWrapper.current.style.height = `${largestExperiencePanelHeight(
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
               relative z-10 m-0 h-fit w-max list-none py-2.5
               max-small:flex max-small:w-full max-small:overflow-y-hidden max-small:overflow-x-scroll
        `}
        >
          {PROGRAMMING_EXPERIENCES.map((job: Job, index: number) => {
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
              max-small:translate-x-[calc(0 * var(--tab-width))]
              visible absolute top-0 left-0
              z-10 my-2.5 h-[var(--tab-height)] w-[85px]
              rounded bg-brown delay-100
              duration-200 max-small:top-auto max-small:bottom-0 max-small:z-20 max-small:h-0.5
              max-small:w-[var(--tab-width)]
            `}
          ></div>
          <div
            className={`
            visible absolute top-0 left-0 ml-1 h-[calc(100%-var(--tab-margin-top))]
            w-0.5 rounded-sm
            bg-black max-small:hidden
          `}
          />
        </div>

        <div
          className="relative ml-5 w-full max-small:ml-0"
          ref={experiencePanelsWrapper}
        >
          {PROGRAMMING_EXPERIENCES.map((job: Job, index: number) => {
            return (
              <div className="experience-panel" key={index + job.dateRange}>
                <ExperiencePanel
                  job={job}
                  activated={index === currentTabIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
}
