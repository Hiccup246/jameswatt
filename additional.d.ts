declare module "*.pdf";

type ShowcaseProjectProps = {
    websiteUrl: string;
    githubRepoUrl: string;
    projectName: string;
    projectImageSrc: string;
}

type SectionLayoutProps = {
    children: ReactElement;
    isBgColorPrimary: Boolean;
}