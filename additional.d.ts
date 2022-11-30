declare module "*.pdf";

type ShowcaseProject = {
    websiteUrl: string;
    githubRepoUrl: string;
    projectName: string;
    projectImageSrc: string;
    firstPublished: Date;
}

type SectionLayoutProps = {
    children: ReactElement;
    isBgColorPrimary: Boolean;
}

type Job = {
    role: string;
    company: string;
    dateRange: string;
    description: string;
    jobHighlights: string[];
}

type Book = {
    name: string;
    author: string;
    genre: string;
    status: string;
    dateStarted: string;
    dateCompleted: string;
}

type TechnologyIcon = { 
    icon: JSX.Element;
    link: string;
    name: string;
}