import EmailIcon from "../Icons/EmailIcon";
import GithubIcon from "../Icons/GithubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import ResumeIcon from "../Icons/ResumeIcon";
import SectionLayout from "../layouts/SectionLayout";

export default function AboutMeSection() {
  return (
    <SectionLayout isBgColorPrimary={false}>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Who am I?
      </h1>

      <p className="mb-8 self-center text-center font-serif text-lg">
        I&apos;m a software engineer based out of London, England and an xpat of
        New Zealand. I enjoy software engineering for its sometimes mind bending
        mix of subjectiveness and objectivness where there is almost never a
        sliver bullet. This has helped me develop extensive software skill over
        6 years of programming and 3 years of working in high performing agile
        teams.
      </p>

      <p className="self-center text-center font-serif text-lg">
        Outside of software my interests include writing, journalism, hiking
        throughout the world, exploring Londons historic pubs, running, reading
        books relating to topics such as sociology, fantasy, politics,
        philosophy and...sensory deprivation tanks ;)
      </p>

      <div className="mt-16 flex flex-row justify-center">
        <div className="my-auto mr-8 w-8 duration-150 ease-in hover:-translate-y-0.5">
          <a
            className="duration-150 ease-in hover:text-grey"
            href="https://github.com/Hiccup246"
            aria-label="Github Profile"
            title="Github Profile"
          >
            <GithubIcon />
          </a>
        </div>

        <div className="my-auto mr-8 w-8 duration-150 ease-in hover:-translate-y-0.5">
          <a
            className="duration-150 ease-in hover:text-grey"
            href="https://www.linkedin.com/in/jameswattpro"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedInIcon />
          </a>
        </div>

        <div className="my-auto mr-8 w-10 duration-200 ease-in hover:-translate-y-0.5">
          <a
            className="duration-150 ease-in hover:text-grey"
            href="mailto:james@jameswatt.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Address"
            title="James Watt Email"
          >
            <EmailIcon />
          </a>
        </div>

        <div className="my-auto w-10 duration-150 ease-in hover:-translate-y-0.5">
          <a
            className="duration-150 ease-in hover:text-grey"
            href="/jameswatt-resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="PDF Resume"
            title="James Watt PDF C.V."
          >
            <ResumeIcon />
          </a>
        </div>
      </div>
    </SectionLayout>
  );
}
