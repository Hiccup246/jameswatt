export default function TechnologyIcon({ icon }: { icon: LinkedIcon }) {
  return (
    <div className="hover group relative h-[86px] w-[86px]">
      <a
        href={icon.link}
        aria-label={icon.name}
        title={icon.name}
        className={`
                        relative z-20
                        mt-1 flex h-full w-full items-center justify-center rounded-md border
                        border-lightgrey bg-white duration-300 group-hover:-translate-y-0.5 group-hover:border-0
                `}
      >
        <div className="flex h-12 w-12 justify-center">{icon.icon}</div>
      </a>

      <div
        className={`
                    group-hover:animation-play
                    absolute -top-px
                    -left-px z-10
                    h-[calc(100%+2px)] w-[calc(100%+2px)]
                    rounded-lg bg-tech-icon-gradient opacity-0 transition-all
                    duration-300 ease-linear group-hover:-translate-y-0.5 group-hover:animate-rotate
                    group-hover:opacity-100 dark:bg-dark-tech-icon-gradient
                `}
      />
    </div>
  );
}
