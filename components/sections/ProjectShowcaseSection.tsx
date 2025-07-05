import SectionLayout from "../layouts/SectionLayout";
import ShowcaseProject from "../ShowcaseProject";
import { PROJECTS } from "../../constants/Projects";

const orderedByPublishDate = PROJECTS.sort(
  (a, b) => b.firstPublished.getTime() - a.firstPublished.getTime(),
);
const highlightedProject =
  orderedByPublishDate.filter((project: ShowcaseProject) => {
    return project.highlightProject;
  })[0] || orderedByPublishDate[0];

orderedByPublishDate.splice(
  orderedByPublishDate.indexOf(highlightedProject),
  1,
);

export default function ProjectShowcaseSection() {
  return (
    <SectionLayout bgSecondary>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Project Showcase
      </h1>

      <div className="mb-10 w-full self-center sm:w-1/2">
        <ShowcaseProject
          websiteUrl={highlightedProject.websiteUrl}
          githubRepoUrl={highlightedProject.githubRepoUrl}
          appStoreUrl={highlightedProject.appStoreUrl}
          projectName={highlightedProject.projectName}
          projectImageSrc={highlightedProject.projectImageSrc}
          firstPublished={highlightedProject.firstPublished}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 gap-y-14 pt-8 md:grid-cols-3">
        {orderedByPublishDate.map((project: ShowcaseProject) => {
          return (
            <ShowcaseProject
              key={project.projectName}
              websiteUrl={project.websiteUrl}
              appStoreUrl={project.appStoreUrl}
              githubRepoUrl={project.githubRepoUrl}
              projectName={project.projectName}
              projectImageSrc={project.projectImageSrc}
              firstPublished={project.firstPublished}
            />
          );
        })}
      </div>
    </SectionLayout>
  );
}
