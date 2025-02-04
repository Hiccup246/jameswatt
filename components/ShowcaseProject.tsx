import AppleIcon from "./Icons/AppleIcon";
import GithubIcon from "./Icons/GithubIcon";
import Image from "next/image";

export default function ShowcaseProject(props: ShowcaseProject) {
  const GithubLink = (props: { projectName: string; url: string }) => (
    <a
      className="text-grey duration-200 ease-in hover:cursor-pointer hover:text-black hover:dark:text-softwhite"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${props.projectName} Github Project`}
    >
      <GithubIcon />
    </a>
  );

  const AppStoreLink = (props: { projectName: string; url: string }) => (
    <a
      className="text-grey duration-200 ease-in hover:cursor-pointer hover:text-black hover:dark:text-softwhite"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${props.projectName} App Store Link`}
    >
      <AppleIcon />
    </a>
  );

  return (
    <div className="hover group mx-auto w-full">
      <div className="transition-transform duration-150 group-hover:-translate-y-2">
        <a
          href={props.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Free online text edit url"
          className="hover:cursor-pointer"
        >
          <Image
            src={props.projectImageSrc}
            width={600}
            className="aspect-video w-full rounded-lg border border-2 border-lightgrey transition-shadow duration-150 group-hover:shadow-lg"
            height={337}
            sizes="(min-width: 768px) 480px,
                               180px"
            alt={`${props.projectName} Website Screenshot`}
          />
        </a>

        <div className="mt-4 flex flex-row justify-between">
          <a
            className="hover:cursor-pointer group-hover:underline"
            href={props.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${props.projectName} Url`}
          >
            {props.projectName}
          </a>

          <div className="my-auto ml-2 h-6 w-6 min-w-[1.5rem]">
            {props.githubRepoUrl && (
              <GithubLink
                projectName={props.projectName}
                url={props.githubRepoUrl}
              />
            )}
            {props.appStoreUrl && (
              <AppStoreLink
                projectName={props.projectName}
                url={props.appStoreUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
