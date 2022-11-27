import GithubIcon from "./GithubIcon";
import Image from "next/image";

export default function ShowcaseProject(props: ShowcaseProjectProps) {
    return (
        <div className="w-full max-w-sm mx-auto group hover">
            <div className="aspect-video">
                <a className="aspect-video"
                    href={props.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Free online text edit url">
                    <Image src={props.projectImageSrc}
                        width={600}
                        className="group-hover:shadow-xl group-hover:opacity-70 rounded-lg shadow-lg border-blue border"
                        height={337}
                        alt={`${props.projectName} Website Screenshot`} />
                </a>

                <div className="flex flex-row justify-between mt-4">
                    <a className="group-hover:underline"
                        href={props.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${props.projectName} Url`}>
                        {props.projectName}
                    </a>

                    <div className="w-6 h-6 my-auto">
                        <a className="hover:cursor-pointer hover:text-black text-grey duration-200 ease-in"
                            href={props.githubRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${props.projectName} Github Project`}>
                            <GithubIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}