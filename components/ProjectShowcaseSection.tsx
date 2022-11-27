import GithubIcon from "./GithubIcon";
import Image from "next/image";

const PROJECTS = new Array<ShowcaseProjectProps>(
    {
        websiteUrl: "https://www.freeonlinetextedit.com/",
        githubRepoUrl: "https://github.com/Hiccup246/free-online-text-edit",
        projectName: "Free Online Text Edit"
    }
)

export default function ProjectShowcaseSection() {
    return (
        <div className="w-full bg-white flex flex-row justify-center pt-10 pb-28">
            <div className="w-full bg-white flex flex-row justify-center pt-10 pb-28">
                <div className="flex flex-col justify-start w-9/12 mx-auto">
                    <h1 className="self-center text-3xl font-bold mb-10">Project Showcase</h1>
                    <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                        <div className="w-full max-w-sm mx-auto group hover">
                            <div className="aspect-video">
                                <a className="aspect-video"
                                    href="https://www.freeonlinetextedit.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Free online text edit url">
                                    <Image src="/freeonlinetextedit.png"
                                        width={600}
                                        className="group-hover:shadow-xl group-hover:opacity-70 rounded-lg shadow-lg border-blue border"
                                        height={337}
                                        alt="Free Online Text Edit Website Screenshot" />
                                </a>

                                <div className="flex flex-row justify-between mt-4">
                                    <a className="group-hover:underline"
                                        href="https://www.freeonlinetextedit.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Free online text edit url">
                                        My Website</a>
                                    <div className="w-6 h-6 my-auto">
                                        <a className="hover:cursor-pointer hover:text-black text-grey duration-200 ease-in"
                                            href="https://github.com/Hiccup246/free-online-text-edit"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Freeonlinetextedit Github Project">
                                            <GithubIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}