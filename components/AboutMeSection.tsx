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
                    I'm a software engineer based out of London, England and an xpat of New Zealand. I enjoy
                    software engineering for its sometimes mind bending mix of subjectiveness and objectivness
                    where there is almost never a sliver bullet. This has helped me develop extensive software
                    skill over 6 years of programming and 3 years of working in high performing agile teams.
                </p>

                <p className="self-center text-lg text-center font-serif">
                    Outside of software my interests include writing, journalism, hiking throughout the world,
                    exploring Londons historic pubs, running, reading books relating to topics such as sociology,
                    fantasy, politics, philosophy and...sensory deprivation tanks ;)
                </p>

                <div className="flex flex-row justify-center mt-10">
                    <div className="w-8 my-auto mr-8 hover:scale-125 transition duration-150">
                        <GithubIcon src="https://www.google.com" />
                    </div>

                    <div className="w-8 my-auto mr-8 hover:cursor-pointer hover:scale-125 duration-200 ease-in">
                        <LinkedInIcon src="https://www.google.com" />
                    </div>

                    <div className="w-10 my-auto mr-8 hover:cursor-pointer hover:scale-125 duration-200 ease-in">
                        <EmailIcon src="https://www.google.com" />
                    </div>

                    <div className="w-10 my-auto hover:cursor-pointer hover:scale-125 duration-200 ease-in">
                        <ResumeIcon src="https://www.google.com" />
                    </div>
                </div>
            </div>
        </div>
    );
}