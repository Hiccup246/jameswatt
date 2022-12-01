import React, { useEffect, useState, useRef } from "react";

import { PROGRAMMING_EXPERIENCES } from "../../constants/WorkExperiences";
import ContentPanelButton from "./ContentPanelButton";
import ContentPanel from "./ContentPanel";
import SectionLayout from "../SectionLayout";

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

export default function ExperienceSection() {
  const contentPanelsWrapper = useRef<HTMLDivElement>(null)

  const tailwindScreenBreakpoints = (resolveConfig(tailwindConfig)?.theme?.screens) as { small:string }
  const mobileViewWidth:string = (tailwindScreenBreakpoints && tailwindScreenBreakpoints.small) || "550px"

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)
  const [sliderStyle, setSliderStyle] = useState<{ width: string, transform:string }>({ width: "", transform: "" })

  function clickOnTabItem(index:number, button:HTMLButtonElement):void {
    let sliderTransform:string;

    const isMobile = window.matchMedia(
      `(max-width: ${mobileViewWidth})`
    ).matches

    if (isMobile) {
      // If the device is a mobile the tabs are horizontal
      const selectedButtonXPosition = `${index} * var(--tab-width)`
      sliderTransform = `translateX(calc(${selectedButtonXPosition}))`
    } else {
      // If the device is a tablet or dekstop then the tabs are vertical
      const selectedButtonYPosition = `(${index} * var(--tab-height)) + (${index} * var(--tab-margin-top))`
      sliderTransform = `translateY(calc(${selectedButtonYPosition})`
    }

    setCurrentTabIndex(index)
    setSliderStyle({ width: button.offsetWidth.toString() + "px", transform: sliderTransform })
  }
  
  function largestContentPanelHeight():number {
    // The largest panel is not know till after rendering. As a result to ensure content
    // does not spill over the section and to not dynamically resize (which moves/pushes other components around)
    // we need to manually determine the max height and set it
    const contentPanels:NodeListOf<HTMLElement> | undefined = contentPanelsWrapper.current?.querySelectorAll(
      ".tab-panel"
    )

    if(!contentPanels) return 1000

    let largestPanelHeight:number = 0

    contentPanels.forEach(panel => {
      if (panel.clientHeight > largestPanelHeight) largestPanelHeight = panel.clientHeight
    })

    return largestPanelHeight
  }

  useEffect(() => {
    if (contentPanelsWrapper.current) {
      contentPanelsWrapper.current.style.height = `${largestContentPanelHeight()}px`
    }
  }, [])

  return (
    <SectionLayout isBgColorPrimary={false}>
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-10">
        My Experience
      </h1>

      <div className="w-full flex max-small:block my-10">
        <div className="relative w-max m-0 list-none z-10 h-fit py-2.5 max-small:flex max-small:w-full max-small:overflow-x-scroll max-small:overflow-y-hidden">
           {
            PROGRAMMING_EXPERIENCES.map((job, index) => {
              return (
                <ContentPanelButton
                  key={index + job.company}
                  companyName={job.company}
                  activated={index === currentTabIndex}
                  clickHandler={(button: HTMLButtonElement) => clickOnTabItem(index, button)}
                />
              )
            })
           }
          <div style={sliderStyle.width.length > 0 ? sliderStyle: {}}
            className={`
              selected-tab-item
              visible absolute top-0 left-0 z-10 w-20
              h-[var(--tab-height)] my-2.5 bg-darkbrown
              transition-[transform width] duration-200 delay-100
              ease-[cubic-bezier(0.645, 0.045, 0.355, 1)]
              max-small:top-auto max-small:bottom-0 max-small:w-[var(--tab-width)]
              max-small:h-0.5 max-small:z-20 max-small:translate-x-[calc(0 * var(--tab-width))]
              rounded
            `}></div>
          <div className={`
            visible absolute top-0 left-0 w-0.5 bg-black
            ml-1 h-[calc(100%-var(--tab-margin-top))]
            max-small:hidden rounded-sm
          `} />
        </div>

        <div className="relative w-full ml-5 max-small:ml-0" ref={contentPanelsWrapper}>
          {
            PROGRAMMING_EXPERIENCES.map((job: Job, index) => {
              return (
                <ContentPanel
                  key={index + job.dateRange}
                  job={job}
                  activated={index === currentTabIndex} />
              )
            })
          }
        </div>
      </div>
    </SectionLayout>
  )
}