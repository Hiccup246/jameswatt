import React, { useEffect, useState } from 'react'

// import './programming-history.css'
import { PROGRAMMING_EXPERIENCES } from '../../constants/WorkExperiences'
import ContentPanelButton from './ContentPanelButton'
import ContentPanel from './ContentPanel'

export default function ExperienceSection() {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const [sliderStyle, setSliderStyle] = useState({ width: '' })

  const tabComponentRef = React.createRef()
  const mobileViewWidth = '550px'

  const setupComponent = () => {
    const panelContainer = tabComponentRef.current
    const newSliderWidth = panelContainer.querySelector(
      '.tab-item.activated'
    ).clientWidth
    const selectedTabItemWidth =
      tabComponentRef.current.querySelector('.selected-tab-item')

    selectedTabItemWidth.style.width = `${newSliderWidth}px`
    panelContainer.style.height = largestPanelHeight()
  }

  const largestPanelHeight = () => {
    let largestPanelHeight = 0

    for (let i = 0; i < PROGRAMMING_EXPERIENCES.length; i++) {
      const panelHeight =
        tabComponentRef.current.querySelector('.tab-panel').clientHeight

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
    setupComponent()
  }, [])

  return (
    <div className="programming-history">
      <h2>📜 Programming History</h2>
      <div ref={tabComponentRef} className="tab-component">
        <div className="tab-menu">
          {PROGRAMMING_EXPERIENCES.map((job, index) => {
            return (
              <ContentPanelButton
                key={index + job.company}
                companyName={job.company}
                activated={index === currentTabIndex}
                clickHandler={(width) => clickOnTab(index, width)}
              />
            )
          })}

          <div style={sliderStyle} className="selected-tab-item"></div>
          <div className="menu-border" />
        </div>

        <div className="tab-content">
          {PROGRAMMING_EXPERIENCES.map((job, index) => {
            return (
              <ContentPanel
                key={index + job.dateRange}
                job={job}
                activated={index === currentTabIndex}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}