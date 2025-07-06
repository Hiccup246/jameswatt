export default function TechnologyIcon({ icon }: { icon: LinkedIcon }) {
  return (
    <a
      href={icon.link}
      tabIndex={-1}
      aria-label={icon.name}
      title={icon.name}
      className={
        "group border-lightgrey dark:bg-softwhite relative mt-1 flex h-[86px] w-[86px] items-center justify-center rounded-md border bg-white duration-300"
      }
    >
      <div className="flex h-12 w-12 justify-center">{icon.icon}</div>
      <div
        className={
          "group-hover:animation-play tech-icon-gradient group-hover:rotate dark:dark-tech-icon-gradient absolute -top-0.5 -left-0.5 -z-10 h-[calc(100%+4px)] w-[calc(100%+4px)] rounded-lg opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
        }
      />
    </a>
  );
}
