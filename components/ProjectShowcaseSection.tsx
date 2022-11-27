import SectionLayout from "./SectionLayout";
import ShowcaseProject from "./ShowcaseProject";

const PROJECTS = new Array<ShowcaseProjectProps>(
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

export default function ProjectShowcaseSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <h1 className="self-center text-3xl font-bold mb-10">Project Showcase</h1>
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-8 gap-y-12">
                {
                    PROJECTS
                    .sort((a, b) => b.firstPublished.getTime() - a.firstPublished.getTime())
                    .map((project: ShowcaseProjectProps) => {
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