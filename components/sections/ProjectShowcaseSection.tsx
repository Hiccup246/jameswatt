import SectionLayout from "../layouts/SectionLayout";
import ShowcaseProject from "../ShowcaseProject";
import { PROJECTS } from "../../constants/Projects";

const orderedByPublishDate = PROJECTS.sort((a, b) => b.firstPublished.getTime() - a.firstPublished.getTime());
const mostRecentProject = orderedByPublishDate[0];
const olderProjects = orderedByPublishDate.slice(1);

export default function ProjectShowcaseSection() {
    return (
        <SectionLayout isBgColorPrimary={false}>
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-16">
                Project Showcase
            </h1>
            
            <div className="md:w-1/2 self-center mb-10">
                <ShowcaseProject
                    websiteUrl={mostRecentProject.websiteUrl}
                    githubRepoUrl={mostRecentProject.githubRepoUrl}
                    projectName={mostRecentProject.projectName}
                    projectImageSrc={mostRecentProject.projectImageSrc}
                    firstPublished={mostRecentProject.firstPublished} />                
            </div>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-start gap-8 gap-y-14">
                {
                    olderProjects
                    .map((project: ShowcaseProject) => {
                        return (
                            <ShowcaseProject
                                key={project.projectName}
                                websiteUrl={project.websiteUrl}
                                githubRepoUrl={project.githubRepoUrl}
                                projectName={project.projectName}
                                projectImageSrc={project.projectImageSrc}
                                firstPublished={project.firstPublished} />
                        )
                    })
                }
            </div>
        </SectionLayout>
    );
}