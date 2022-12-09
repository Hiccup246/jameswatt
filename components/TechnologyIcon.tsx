export default function TechnologyIcon({ icon }: { icon: TechnologyIcon }) {
  return (
    <div className="slide relative h-[100px] w-[200px]">
      <div className="hover group relative h-[86px] w-[86px] duration-150 hover:-translate-y-0.5 hover:shadow-md">
        <a
          href={icon.link}
          aria-label={icon.name}
          title={icon.name}
          className={`
                        relative z-20 mt-1 flex h-full w-full items-center justify-center
                        rounded-md border border-lightgrey bg-white group-hover:border-0
                `}
        >
          <div className="flex h-12 w-12 justify-center">
            <title>{icon.name}</title>
            {icon.icon}
          </div>
        </a>

        <div
          className={`
                    group-hover:animation-play absolute
                    top-0 left-0
                    z-10 h-[calc(100%+2px)]
                    w-[calc(100%+2px)] -translate-x-px -translate-y-px rounded-lg bg-tech-icon-gradient
                    opacity-0 transition-all duration-300 ease-linear
                    group-hover:animate-rotate group-hover:opacity-100
                `}
        />
      </div>
    </div>
  );
}
