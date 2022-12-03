import EmailIcon from "./Icons/EmailIcon";
import GithubIcon from "./Icons/GithubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import ResumeIcon from "./Icons/ResumeIcon";
import SectionLayout from "./SectionLayout";

export default function AboutMeSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-16 mt-16">
                Who am I?
            </h1>

            <p className="self-center text-lg text-center font-serif mb-8">
                I&apos;m a software engineer based out of London, England and an xpat of New Zealand. I enjoy
                software engineering for its sometimes mind bending mix of subjectiveness and objectivness
                where there is almost never a sliver bullet. This has helped me develop extensive software
                skill over 6 years of programming and 3 years of working in high performing agile teams.
            </p>

            <p className="self-center text-lg text-center font-serif">
                Outside of software my interests include writing, journalism, hiking throughout the world,
                exploring Londons historic pubs, running, reading books relating to topics such as sociology,
                fantasy, politics, philosophy and...sensory deprivation tanks ;)
            </p>

            <div className="flex flex-row justify-center mt-16">
                <div className="w-8 my-auto mr-8 hover:-translate-y-0.5 duration-150 ease-in">
                    <a className="hover:text-grey duration-150 ease-in" 
                        href="https://github.com/Hiccup246"
                        aria-label="Github Profile"
                        title="Github Profile">
                        <GithubIcon />
                    </a>
                </div>

                <div className="w-8 my-auto mr-8 hover:-translate-y-0.5 duration-150 ease-in">
                    <a className="hover:text-grey duration-150 ease-in" 
                        href="https://www.linkedin.com/in/jameswattpro"
                        aria-label="LinkedIn Profile"
                        title="LinkedIn Profile">
                        <LinkedInIcon />
                    </a>
                </div>

                <div className="w-10 my-auto mr-8 hover:-translate-y-0.5 duration-200 ease-in">
                    <a className="hover:text-grey duration-150 ease-in"
                        href="mailto:james@jameswatt.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email Address"
                        title="James Watt Email">
                        <EmailIcon />
                    </a>
                </div>

                <div className="w-10 my-auto hover:-translate-y-0.5 duration-150 ease-in">
                    <a className="hover:text-grey duration-150 ease-in" 
                        href="/jameswatt-resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="PDF Resume"
                        title="James Watt PDF C.V.">
                        <ResumeIcon />
                    </a>
                </div>
            </div>
        </SectionLayout>
    );
}