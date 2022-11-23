import EmailIcon from "./EmailIcon";
import GithubIcon from "./GithubIcon";
import LinkedInIcon from "./LinkedInIcon";
import ResumeIcon from "./ResumeIcon";

export default function AboutMeSection() {
    return (
        <div className="w-full bg-white flex flex-row justify-center pt-10 pb-28">
            <div className="flex flex-col justify-start w-9/12 mx-auto">
                <h1 className="self-center text-3xl font-bold mb-10">Who am I?</h1>

                <p className="self-center text-lg text-center font-serif mb-8">
                    I&apos;m a software engineer based out of London, England and an xpat of New Zealand. I enjoy
                    software engineering for its sometimes mind bending mix of subjectiveness and objectivness
                    where there is almost never a sliver bullet. This has helped me develop extensive software
                    skill over 6 years of programming and 3 years of working in high performing agile teams.
                </p>

                <p className="self-center text-lg text-center font-serif mb-10">
                    Outside of software my interests include writing, journalism, hiking throughout the world,
                    exploring Londons historic pubs, running, reading books relating to topics such as sociology,
                    fantasy, politics, philosophy and...sensory deprivation tanks ;)
                </p>

                <div className="flex flex-row justify-center">
                    {/* text-grey transition-colors ease-[cubic-bezier(0.05,0,0,1)] duration-500 */}
                    <div className="w-8 my-auto mr-8 hover:scale-105 duration-200 ease-in">
                        <a className="hover:cursor-pointer hover:text-grey duration-200 ease-in" 
                            href="https://github.com/Hiccup246"
                            aria-label="Github Profile">
                            <GithubIcon />
                        </a>
                    </div>

                    <div className="w-8 my-auto mr-8 hover:scale-105 duration-200 ease-in">
                        <a className="hover:cursor-pointer hover:text-grey duration-200 ease-in" 
                            href="https://www.linkedin.com/in/jameswattpro"
                            aria-label="LinkedIn Profile">
                            <LinkedInIcon />
                        </a>
                    </div>

                    <div className="w-10 my-auto mr-8 hover:scale-105 duration-200 ease-in">
                        <a className="hover:cursor-pointer hover:text-grey duration-200 ease-in"
                            href="mailto:james@jameswatt.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Email Address">
                            <EmailIcon />
                        </a>
                    </div>

                    <div className="w-10 my-auto hover:scale-105 duration-200 ease-in">
                        <a className="hover:cursor-pointer hover:text-grey duration-200 ease-in" 
                            href="/jameswatt-resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="PDF Resume">
                            <ResumeIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}