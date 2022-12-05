export default function ExperiencePanel({
  job,
  activated,
}: {
  job: Job;
  activated: boolean;
}) {
  const activatedClasses = "pt-2.5 visible relative opacity-100 activated";
  const deactivatedClasses = "opacity-0 invisible";
  const tabPanelClasses = `absolute m-0 p-0 w-full transition-opacity duration-700 ease-in-out top-0 ${
    activated ? activatedClasses : deactivatedClasses
  }`;

  return (
    <div className={tabPanelClasses}>
      <h2 className="m-0">
        <span className="text-xl font-bold text-black">{job.role}</span>
        <span className="text-xl font-bold text-black"> @ {job.company}</span>
      </h2>
      <p className="mt-1 mb-4 text-black">{job.dateRange}</p>
      <div className="pb-4">{job.description}</div>
      <ul className="m-0 list-none p-0">
        {job.jobHighlights.map((highlight: string, index: number) => {
          return (
            <li
              className={`
                    relative mt-4 pl-8 pb-2.5 before:absolute
                    before:left-0 before:text-black before:content-["→"]
                  `}
              key={index}
              dangerouslySetInnerHTML={{ __html: highlight }}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}
