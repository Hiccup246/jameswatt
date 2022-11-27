import React, { useEffect, useState } from "react"

// import './programming-history.css'
import { PROGRAMMING_EXPERIENCES } from "../../constants/WorkExperiences"
import ContentPanelButton from "./ContentPanelButton"
import ContentPanel from "./ContentPanel"
import SectionLayout from "../SectionLayout"

export default function ExperienceSection() {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const [sliderStyle, setSliderStyle] = useState({ width: "" })

  const tabComponentRef = React.createRef()
  const mobileViewWidth = "550px"

  const setupComponent = () => {
    const panelContainer = tabComponentRef.current
    const newSliderWidth = panelContainer.querySelector(
      ".tab-item.activated"
    ).clientWidth
    const selectedTabItemWidth =
      tabComponentRef.current.querySelector(".selected-tab-item")

    selectedTabItemWidth.style.width = `${newSliderWidth}px`
    panelContainer.style.height = largestPanelHeight()
  }

  const largestPanelHeight = () => {
    let largestPanelHeight = 0

    for (let i = 0; i < PROGRAMMING_EXPERIENCES.length; i++) {
      const panelHeight =
        tabComponentRef.current.querySelector(".tab-panel").clientHeight

      if (panelHeight > largestPanelHeight) {
        largestPanelHeight = panelHeight
      }
    }

    return `${largestPanelHeight}px`
  }

  const clickOnTab = (newTabIndex, buttonWidth) => {
    updateSelectedTabItem(newTabIndex, `${buttonWidth}px`)
    setCurrentTabIndex(newTabIndex)
  }

  const updateSelectedTabItem = (newTabIndex, newSliderWidth) => {
    const isMobile = window.matchMedia(
      `(max-width: ${mobileViewWidth})`
    ).matches
    let sliderTransformString

    if (isMobile) {
      // If the device is a mobile the tabs are horizontal
      const paddingX = `calc(${newTabIndex}*var(--tab-width))`
      const transformXString = `translateX(${paddingX})`
      sliderTransformString = transformXString
    } else {
      // If the device is a tablet or dekstop then the tabs are vertical
      const paddingY = `calc(${newTabIndex}* var(--tab-margin-top))`
      const heightGap = `calc(${newTabIndex}* var(--tab-height))`
      const transformYString = `translateY(calc(${paddingY} + ${heightGap}))`
      sliderTransformString = transformYString
    }

    setSliderStyle({ width: newSliderWidth, transform: sliderTransformString })
  }

  useEffect(() => {
    // setupComponent()
  }, [])

  return (
    <SectionLayout isBgColorPrimary={false}>
      <h1 className="self-center text-2xl sm:text-3xl font-bold mb-10">
        My Experience
      </h1>

      <div ref={tabComponentRef} className="w-full flex min-[400px]:block">
        <div className="relative w-max m-0 px-2.5 list-none z-10 h-full">
           {
            PROGRAMMING_EXPERIENCES.map((job, index) => {
              return (
                <ContentPanelButton
                  key={index + job.company}
                  companyName={job.company}
                  activated={index === currentTabIndex}
                  clickHandler={(width) => clickOnTab(index, width)}
                />
              )
            })
           }
          <div style={sliderStyle} className="visible absolute top-0 left-0 z-10 w-20 h-[var(--tab-height)] my-2.5 bg-darkbrown"></div>
          <div className="visible absolute top-0 left-0 w-0.5 bg-black ml-1 h-[calc(100%-var(--tab-margin-top))]" />
        </div>
      </div>
    </SectionLayout>
  )
  {/* // return (
  //   <div className="programming-history">
  //     <h2>📜 Programming History</h2>
  //     <div ref={tabComponentRef} className="tab-component">
  //       <div className="tab-menu">
  //         {PROGRAMMING_EXPERIENCES.map((job, index) => {
  //           return (
  //             <ContentPanelButton
  //               key={index + job.company}
  //               companyName={job.company}
  //               activated={index === currentTabIndex}
  //               clickHandler={(width) => clickOnTab(index, width)}
  //             />
  //           )
  //         })}

  //         <div style={sliderStyle} className="selected-tab-item"></div>
  //         <div className="menu-border" />
  //       </div>

  //       <div className="tab-content">
  //         {PROGRAMMING_EXPERIENCES.map((job, index) => {
  //           return (
  //             <ContentPanel
  //               key={index + job.dateRange}
  //               job={job}
  //               activated={index === currentTabIndex}
  //             />
  //           )
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // ) */}
}