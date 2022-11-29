import React from "react"

export default function ContentPanelButton({ companyName, activated, clickHandler }: { companyName:string, activated: boolean, clickHandler:Function }) {
  const activatedClasses = activated ? "text-black activated" : ""

  return (
    <button
      aria-label={companyName}
      className={`
        tab-item
        cursor-pointer relative flex w-fit
        h-[var(--tab-height)]
        leading-[var(--tab-height)] px-5 bg-transparent
        whitespace-nowrap z-20 text-black
        mb-[var(--tab-margin-top)] focus-visible:border-none
        max-small:mb-0 max-small:max-w-[var(--tab-width)]
        max-small:grow-0 max-small:shrink-0 max-small:basis-[var(--tab-width)]
        max-small:justify-center
        ${activatedClasses}
      `}
      onClick={(element) => clickHandler(element.currentTarget.offsetWidth)}
    >
      {companyName}
    </button>
  )
}