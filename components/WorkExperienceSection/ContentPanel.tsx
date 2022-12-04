import React from "react"

export default function ContentPanel({ job, activated }: { job:Job, activated:boolean }) {
  const activatedClasses = "pt-2.5 visible relative opacity-100 activated"
  const deactivatedClasses = "opacity-0 invisible"
  const tabPanelClasses = `absolute m-0 p-0 w-full transition-opacity duration-700 ease-in-out top-0 ${activated ? activatedClasses : deactivatedClasses}`

  return (
    <div className={`tab-panel ${tabPanelClasses}`}>
      <h2 className="m-0">
        <span className="text-black font-bold text-xl">{job.role}</span>
        <span className="text-black font-bold text-xl"> @ {job.company}</span>
      </h2>
      <p className="mt-1 text-black mb-4">{job.dateRange}</p>
      <div className="pb-4">{job.description}</div>
      <ul className="p-0 m-0 list-none">
        {
          job.jobHighlights.map((highlight: string, index) => {
            return (
              <li className={`
                    relative mt-4 pl-8 pb-2.5 before:content-['→']
                    before:absolute before:left-0 before:text-black
                  `}
                  key={index}
                  dangerouslySetInnerHTML={{__html: highlight}}>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}