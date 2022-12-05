import SectionLayout from "../layouts/SectionLayout";
import ShowcaseProject from "../ShowcaseProject";
import { PROJECTS } from "../../constants/Projects";

const orderedByPublishDate = PROJECTS.sort(
  (a, b) => b.firstPublished.getTime() - a.firstPublished.getTime()
);
const mostRecentProject = orderedByPublishDate[0];
const olderProjects = orderedByPublishDate.slice(1);

export default function ProjectShowcaseSection() {
  return (
    <SectionLayout bgSecondary>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Project Showcase
      </h1>

      <div className="mb-10 self-center md:w-1/2">
        <ShowcaseProject
          websiteUrl={mostRecentProject.websiteUrl}
          githubRepoUrl={mostRecentProject.githubRepoUrl}
          projectName={mostRecentProject.projectName}
          projectImageSrc={mostRecentProject.projectImageSrc}
          firstPublished={mostRecentProject.firstPublished}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 gap-y-14 pt-8 md:grid-cols-3">
        {olderProjects.map((project: ShowcaseProject) => {
          return (
            <ShowcaseProject
              key={project.projectName}
              websiteUrl={project.websiteUrl}
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
