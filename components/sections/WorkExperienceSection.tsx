import { useEffect, useState, useRef } from "react";

import { PROGRAMMING_EXPERIENCES } from "../../constants/WorkExperiences";
import TabButton from "../TabButton";
import ExperiencePanel from "../ExperiencePanel";
import SectionLayout from "../layouts/SectionLayout";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export default function WorkExperienceSection() {
  const contentPanelsWrapper = useRef<HTMLDivElement>(null);

  const tailwindScreenBreakpoints = resolveConfig(tailwindConfig)?.theme
    ?.screens as { small: string };
  const mobileViewWidth: string =
    (tailwindScreenBreakpoints && tailwindScreenBreakpoints.small) || "550px";

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [sliderStyle, setSliderStyle] = useState<{
    width: string;
    transform: string;
  }>({ width: "", transform: "" });

  function clickOnTabButton(index: number, button: HTMLButtonElement): void {
    let sliderTransform: string;

    const isMobile = window.matchMedia(
      `(max-width: ${mobileViewWidth})`
    ).matches;

    if (isMobile) {
      // If the device is a mobile the tabs are horizontal
      const selectedButtonXPosition = `${index} * var(--tab-width)`;
      sliderTransform = `translateX(calc(${selectedButtonXPosition}))`;
    } else {
      // If the device is a tablet or dekstop then the tabs are vertical
      const selectedButtonYPosition = `(${index} * var(--tab-height)) + (${index} * var(--tab-margin-top))`;
      sliderTransform = `translateY(calc(${selectedButtonYPosition})`;
    }

    setCurrentTabIndex(index);
    setSliderStyle({
      width: button.offsetWidth.toString() + "px",
      transform: sliderTransform,
    });
  }

  function largestContentPanelHeight(): number {
    // The largest panel is not know till after rendering. As a result to ensure content
    // does not spill over the section and to not dynamically resize (which moves/pushes other components around)
    // we need to manually determine the max height and set it
    const contentPanels: NodeListOf<HTMLElement> | undefined =
      contentPanelsWrapper.current?.querySelectorAll(".tab-panel");

    if (!contentPanels) return 1000;

    let largestPanelHeight: number = 0;

    contentPanels.forEach((panel) => {
      if (panel.clientHeight > largestPanelHeight)
        largestPanelHeight = panel.clientHeight;
    });

    return largestPanelHeight;
  }

  useEffect(() => {
    if (contentPanelsWrapper.current) {
      contentPanelsWrapper.current.style.height = `${largestContentPanelHeight()}px`;
    }
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
            style={sliderStyle.width.length > 0 ? sliderStyle : {}}
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
          ref={contentPanelsWrapper}
        >
          {PROGRAMMING_EXPERIENCES.map((job: Job, index: number) => {
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
