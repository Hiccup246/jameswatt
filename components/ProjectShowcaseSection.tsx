import SectionLayout from "./SectionLayout";
import ShowcaseProject from "./ShowcaseProject";

const PROJECTS = new Array<ShowcaseProjectProps>(
    {
        websiteUrl: "https://www.freeonlinetextedit.com/",
        githubRepoUrl: "https://github.com/Hiccup246/free-online-text-edit",
        projectName: "Free Online Text Edit",
        projectImageSrc: "/freeonlinetextedit.png"
    }
)

export default function ProjectShowcaseSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <h1 className="self-center text-3xl font-bold mb-10">Project Showcase</h1>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                {
                    PROJECTS.map((project: ShowcaseProjectProps) => {
                        return (
                            <ShowcaseProject
                            websiteUrl={project.websiteUrl}
                            githubRepoUrl={project.githubRepoUrl}
                            projectName={project.projectName}
                            projectImageSrc={project.projectImageSrc} />
                        )
                    })
                }
            </div>
        </SectionLayout>
    );
}