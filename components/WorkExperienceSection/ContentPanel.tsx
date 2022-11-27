import React from "react"

// import './content-panel.css'

export default function ContentPanel({ job, activated }: { job:{ role:string, company:string, dateRange:string, description:string, bullets:[] }, activated:boolean }) {
  const activatedClasses = "pt-2.5 visible relative opacity-100 activated"
  const deactivatedClasses = "opacity-0 invisible"
  const tabPanelClasses = `absolute m-0 p-0 w-full transition-opacity duration-500 delay-[0s] ease-in-out top-0 ${activated ? activatedClasses : deactivatedClasses}`

  return (
    <div className={`tab-panel ${tabPanelClasses}`}>
      <h3 className="m-0">
        <span className="text-black font-bold text-xl">{job.role}</span>
        <span className="text-black font-bold text-xl"> @ {job.company}</span>
      </h3>
      <p className="mt-1 text-black mb-4">{job.dateRange}</p>
      <div className="pb-4">{job.description}</div>
      <ul className="p-0 m-0 list-none">
        {
          job.bullets.map((element, index) => {
            return (
              <li className={`
                    relative mt-4 pl-8 pb-2.5 before:content-['→']
                    before:absolute before:left-0 before:text-black
                  `}
                  key={index}>
                  {element}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}