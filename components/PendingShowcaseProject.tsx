import ShowcaseProject from "./ShowcaseProject";

export default function PendingShowcaseProject(props: ShowcaseProject) {
  // Import Image
  // Import construction animation

  return (
    <div>
      <ShowcaseProject
        key={props.projectName}
        websiteUrl={props.websiteUrl}
        githubRepoUrl={props.githubRepoUrl}
        projectName={props.projectName}
        projectImageSrc={props.projectImageSrc}
        firstPublished={props.firstPublished}
      />
    </div>
  );
}
