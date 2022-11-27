import SectionLayout from "./SectionLayout";
import ShowcaseProject from "./ShowcaseProject";

const PROJECTS = new Array<ShowcaseProject>(
    {
        websiteUrl: "https://www.custom-sound-board.com/",
        githubRepoUrl: "https://github.com/Hiccup246/custom-sound-board",
        projectName: "Custom Sound Board",
        projectImageSrc: "/custom-sound-board.webp",
        firstPublished: new Date(2022, 10, 5) // "5/11/2022"
    },
    {
        websiteUrl: "https://www.freeonlinetextedit.com/",
        githubRepoUrl: "https://github.com/Hiccup246/free-online-text-edit",
        projectName: "Free Online Text Edit",
        projectImageSrc: "/freeonlinetextedit.webp",
        firstPublished: new Date(2021, 10, 30) // "30/11/2021"
    },
    {
        websiteUrl: "https://www.old.jameswatt.io",
        githubRepoUrl: "https://github.com/Hiccup246/old-jameswatt-portfolio",
        projectName: "Old Portfolio Site",
        projectImageSrc: "/old-jameswatt.webp",
        firstPublished: new Date(2021, 10, 22) // "22/11/2021"
    },
    {
        websiteUrl: "https://www.normmacdonaldquotes.com/",
        githubRepoUrl: "https://github.com/Hiccup246/norm-macdonald-quotes",
        projectName: "Norm MacDonald Quotes",
        projectImageSrc: "/norm-macdonald-quotes.webp",
        firstPublished: new Date(2022, 4, 26) // "26/05/2022"
    },
    {
        websiteUrl: "https://www.guncontrolpolicies.com/",
        githubRepoUrl: "https://github.com/Hiccup246/gun-control-policies",
        projectName: "Gun Control Policies",
        projectImageSrc: "/gun-control-policies.webp",
        firstPublished: new Date(2022, 5, 13) // "13/06/2022""
    },
    {
        websiteUrl: "https://www.npmjs.com/package/james-watt-calling-card",
        githubRepoUrl: "https://github.com/Hiccup246/james-watt-calling-card",
        projectName: "James Watt Calling Card",
        projectImageSrc: "/james-watt-calling-card.webp",
        firstPublished: new Date(2022, 9, 7) // "7/10/2022"
    },
);

const orderedByPublishDate = PROJECTS.sort((a, b) => b.firstPublished.getTime() - a.firstPublished.getTime());
const mostRecentProject = orderedByPublishDate[0];
const olderProjects = orderedByPublishDate.slice(1);

export default function ProjectShowcaseSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <h1 className="self-center text-3xl font-bold mb-14">
                Project Showcase
            </h1>
            
            <div className="w-1/2 self-center mb-10">
                <ShowcaseProject
                    websiteUrl={mostRecentProject.websiteUrl}
                    githubRepoUrl={mostRecentProject.githubRepoUrl}
                    projectName={mostRecentProject.projectName}
                    projectImageSrc={mostRecentProject.projectImageSrc}
                    firstPublished={mostRecentProject.firstPublished} />                
            </div>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-8 gap-y-14">
                {
                    olderProjects
                    .map((project: ShowcaseProject) => {
                        return (
                            <ShowcaseProject
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