"use client";

import EmailIcon from "../Icons/EmailIcon";
import GithubIcon from "../Icons/GithubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import ResumeIcon from "../Icons/ResumeIcon";
import SectionLayout from "../layouts/SectionLayout";

export default function AboutMeSection() {
  function copyToClipboard(text: string | undefined): void {
    if (text == undefined) return;

    navigator.clipboard.writeText(text);
  }

  return (
    <SectionLayout>
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
        <div className="group my-auto mr-8 w-8">
          <a
            className="block duration-150 ease-in group-hover:-translate-y-0.5 group-hover:text-grey"
            href="https://github.com/Hiccup246"
            aria-label="Github Profile"
            title="Github Profile"
          >
            <GithubIcon />
          </a>
        </div>

        <div className="group my-auto mr-8 w-8">
          <a
            className="block duration-150 ease-in group-hover:-translate-y-0.5 group-hover:text-grey"
            href="https://www.linkedin.com/in/jameswattpro"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedInIcon />
          </a>
        </div>

        <div className="group relative my-auto mr-8 w-10" tabIndex={0}>
          <div className="duration-200 ease-in group-hover:-translate-y-0.5 group-hover:text-grey">
            <EmailIcon />
          </div>

          <div
            role="tooltip"
            className="invisible absolute -left-[128px] top-[50px] h-fit w-[246px] rounded-lg bg-brown opacity-0 shadow delay-200 duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 dark:bg-darkgrey"
          >
            <div className="relative">
              <div className="absolute -top-[20px] right-[90px] z-10 h-4 w-4 rotate-45 bg-brown dark:bg-darkgrey" />

              <div className="z-20 my-3 flex w-full justify-center">
                <a
                  className="mr-2 p-1 hover:underline"
                  href={`mailto:${process.env.NEXT_PUBLIC_AUTHOR_CONTACT_EMAIL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Address"
                  title="James Watt Email"
                >
                  Open in email
                </a>

                <button
                  onClick={() =>
                    copyToClipboard(
                      process.env.NEXT_PUBLIC_AUTHOR_CONTACT_EMAIL,
                    )
                  }
                  className="z-20 ml-2 h-fit w-fit rounded bg-darkbrown p-1 px-2 hover:opacity-70 active:-translate-y-0.5 dark:bg-darkteal"
                >
                  Copy email
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="group my-auto w-10">
          <a
            className="block duration-150 ease-in group-hover:-translate-y-0.5 group-hover:text-grey"
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
