import { PROGRAMMING_EXPERIENCES } from "../../constants/WorkExperiences";
import SectionLayout from "../layouts/SectionLayout";
import TabsManager from "../TabsManager";

export default function WorkExperienceSection() {
  return (
    <SectionLayout>
      <h1 className="my-16 text-center text-2xl font-bold sm:text-3xl">
        My Experience
      </h1>

      <TabsManager>
        {PROGRAMMING_EXPERIENCES.map((job: Job) => {
          return (
            <div title={job.company} key={`${job.company}-${job.dateRange}`}>
              <h2 className="m-0">
                <span className="text-xl font-bold">{job.role}</span>
                <span className="text-xl font-bold"> @ {job.company}</span>
              </h2>
              <p className="mt-1 mb-4">{job.dateRange}</p>
              <div className="pb-4">{job.description}</div>
              <ul className="m-0 list-none p-0">
                {job.jobHighlights.map((highlight: string) => {
                  return (
                    <li
                      className="relative mt-4 pb-2.5 pl-8 before:absolute before:left-0 before:content-['→']"
                      key={highlight}
                      dangerouslySetInnerHTML={{ __html: highlight }}
                    ></li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </TabsManager>
    </SectionLayout>
  );
}
