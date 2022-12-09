import { PROGRAMMING_EXPERIENCES } from "../constants/WorkExperiences";
import SectionLayout from "./layouts/SectionLayout";
import TabsComponent from "./TabsComponent";

export default function WorkExperienceTabs() {
  return (
    <SectionLayout>
      <h1 className="my-16 text-center text-2xl font-bold sm:text-3xl">
        My Experience
      </h1>

      <TabsComponent>
        {PROGRAMMING_EXPERIENCES.map((job: Job, index: number) => {
          return (
            <div aria-label={job.company} key={job.company + Math.random()}>
              <h2 className="m-0">
                <span className="text-xl font-bold text-black">{job.role}</span>
                <span className="text-xl font-bold text-black">
                  {" "}
                  @ {job.company}
                </span>
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
        })}
      </TabsComponent>
    </SectionLayout>
  );
}
