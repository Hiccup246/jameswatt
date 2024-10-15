declare module "*.pdf";

type ShowcaseProject = {
  websiteUrl: string;
  githubRepoUrl?: string;
  appStoreUrl?: string;
  projectName: string;
  projectImageSrc: string;
  firstPublished: Date;
  highlightProject?: boolean;
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
  status: BookStatus;
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
