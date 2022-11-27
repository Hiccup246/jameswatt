declare module "*.pdf";

type ShowcaseProjectProps = {
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