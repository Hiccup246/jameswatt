import GithubIcon from "./Icons/GithubIcon";
import Image from "next/image";

export default function ShowcaseProject(props: ShowcaseProject) {
    return (
        <div className="w-full mx-auto group hover hover:-translate-y-0.5 duration-150 transition-transform">
            <div>
                <a  href={props.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Free online text edit url">
                    <Image src={props.projectImageSrc}
                        width={600}
                        className="group-hover:shadow-md group-hover:opacity-70 transition-shadow duration-150 rounded-lg border-lightgrey border-2 border"
                        height={337}
                        sizes="(min-width: 640px) 480px,
                               180px"
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

                    <div className="w-6 h-6 my-auto min-w-[1.5rem] ml-2">
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