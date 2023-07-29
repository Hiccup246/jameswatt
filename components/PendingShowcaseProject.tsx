import ShowcaseProject from "./ShowcaseProject";

export default function PendingShowcaseProject(props: ShowcaseProject) {
  // Import Image
  // Import construction animation ⚒️ 👷
  // Create construction tape div rectangle
  //   - Make div have horizontal black bars and animate infinite scroll

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
