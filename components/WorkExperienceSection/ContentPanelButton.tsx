import React from "react"

// import './content-panel-button.css'

export default function ContentPanelButton({ companyName, activated, clickHandler }: { companyName:string, activated: boolean, clickHandler:Function }) {
  const activatedClasses = activated ? "text-black" : ""
  return (
    <button
      aria-label={companyName}
      className={`cursor-pointer relative flex w-fit items-center h-[var(--tab-height)] leading-[var(--tab-height)] py-5 bg-transparent text-left whitespace-nowrap z-20 text-grey mt-[var(--tab-margin-top)] focus-visible:border-none ${activatedClasses}`}
      onClick={(element) => clickHandler(element.currentTarget.offsetWidth)}
    >
      {companyName}
    </button>
  )
}