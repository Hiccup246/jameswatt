declare module "*.pdf";

type ShowcaseProject = {
  websiteUrl: string;
  githubRepoUrl: string;
  projectName: string;
  projectImageSrc: string;
  firstPublished: Date;
};

type SectionLayoutProps = {
  children: ReactElement;
  bgSecondary?: boolean;
  noBottomPadding?: boolean;
};

type Job = {
  role: string;
  company: string;
  dateRange: string;
  description: string;
  jobHighlights: string[];
};

type Book = {
  name: string;
  author: string;
  genre: string;
  status: string;
  dateStarted: string;
  dateCompleted: string;
};

type LinkedIcon = {
  icon: JSX.Element;
  link: string;
  name: string;
};

interface Spring {
  position: number;
  vibration: number;
}
