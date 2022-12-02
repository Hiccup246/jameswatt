import SectionLayout from "./SectionLayout";
import { GROUP1, GROUP2, GROUP3 } from "../constants/TechnologyIcons";
 
export default function TechnologiesSection() {
    function slideIcon(technologyIcon:TechnologyIcon) {
        return (
            <div className="relative slide h-[100px] w-[var(--slider-item-width)]">
                <div className="h-[86px] w-[86px] group hover relative hover:-translate-y-0.5 duration-150 hover:shadow-md">
                    <a href={technologyIcon.link} aria-label={technologyIcon.name} title={technologyIcon.name}
                       className="w-full h-full relative flex items-center justify-center bg-white rounded-md border-lightgrey border group-hover:border-0 mt-1 z-20">
                        <div className="flex justify-center h-12 w-12">
                            {technologyIcon.icon}
                        </div>
                    </a>

                    <div className={`
                            group-hover:animation-play group-hover:opacity-100
                            group-hover:animate-rotate transition-all
                            duration-300 ease-linear
                            absolute top-0 left-0 w-[calc(100%+2px)] h-[calc(100%+2px)]
                            opacity-0 rounded-lg -translate-x-px -translate-y-px
                            bg-tech-icon-gradient z-10
                         `}>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <SectionLayout isBgColorPrimary={false}>
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-14">
                Technologies I Dabble With
            </h1>

            <div className="w-full container relative overflow-hidden">
                <div className="w-full relative m-auto h-24">
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] hover:animation-pause animate-scroll">
                        {
                            [...GROUP1, ...GROUP1].map((technologyIcon, index) => {
                                return (
                                    <div key={technologyIcon.name + index}>
                                        {slideIcon(technologyIcon)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="w-full relative m-auto h-24">
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] hover:animation-pause animate-scroll-reverse">
                        {
                            [...GROUP2, ...GROUP2].map((technologyIcon, index) => {
                                return (
                                    <div key={technologyIcon.name + index}>
                                        {slideIcon(technologyIcon)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="w-full relative m-auto h-24">
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] hover:animation-pause animate-scroll">
                        {
                            [...GROUP3, ...GROUP3].map((technologyIcon, index) => {
                                return (
                                    <div key={technologyIcon.name + index}>
                                        {slideIcon(technologyIcon)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="absolute top-0 left-0 h-full w-5 sm:w-[50px] md:w-[100px] lg:w-[100px] bg-gradient-to-r from-brown via-brown dark:from-black to-transparent"></div>
                <div className="absolute top-0 right-0 h-full w-5 sm:w-[50px] md:w-[100px] lg:w-[100px] bg-gradient-to-l from-brown via-brown dark:from-black to-transparent"></div>
            </div>
        </SectionLayout>
    )
}