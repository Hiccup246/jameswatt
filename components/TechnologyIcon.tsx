export default function TechnologyIcon({ icon }: { icon: LinkedIcon }) {
  return (
    <a
      href={icon.link}
      tabIndex={-1}
      aria-label={icon.name}
      title={icon.name}
      className={`
        group relative relative mt-1
        flex
        h-[86px] w-[86px] items-center justify-center rounded-md border
        border-lightgrey bg-white duration-300
      `}
    >
      <div className="flex h-12 w-12 justify-center">{icon.icon}</div>
      <div
        className={`
          group-hover:animation-play absolute -left-0.5 -top-0.5 -z-10 h-full
          h-[calc(100%+4px)] w-full w-[calc(100%+4px)] rounded-lg bg-tech-icon-gradient opacity-0 transition-all
          duration-300 ease-linear group-hover:animate-rotate group-hover:opacity-100 dark:bg-dark-tech-icon-gradient
        `}
      />
    </a>
  );
}
