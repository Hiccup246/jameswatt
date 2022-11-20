import React from 'react'

// import './content-panel-button.css'

export default function ContentPanelButton({ companyName, activated, clickHandler }: { companyName:string, activated: boolean, clickHandler:Function }) {
  return (
    <button
      aria-label={companyName}
      className={activated ? 'tab-item activated' : 'tab-item'}
      onClick={(element) => clickHandler(element.currentTarget.offsetWidth)}
    >
      {companyName}
    </button>
  )
}