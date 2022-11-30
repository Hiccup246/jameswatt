import { ReactElement } from "react";
import AngularIcon from "./Icons/AngularIcon";
import BulmaIcon from "./Icons/BulmaIcon";
import CssIcon from "./Icons/CssIcon";
import DenoIcon from "./Icons/DenoIcon";
import FigmaIcon from "./Icons/FigmaIcon";
import FreshIcon from "./Icons/FreshIcon";
import GatsbyIcon from "./Icons/GatsbyIcon";
import GoIcon from "./Icons/GoIcon";
import HtmlIcon from "./Icons/HtmlIcon";
import JavascriptIcon from "./Icons/JavascriptIcon";
import NextJsIcon from "./Icons/NextJsIcon";
import NodeIcon from "./Icons/NodeIcon";
import NuxtIcon from "./Icons/NuxtIcon";
import PostgresIcon from "./Icons/PostgresIcon";
import ReactIcon from "./Icons/ReactIcon";
import RubyIcon from "./Icons/RubyIcon";
import RubyOnRailsIcon from "./Icons/RubyOnRailsIcon";
import SolidityIcon from "./Icons/SolidityIcon";
import SvelteIcon from "./Icons/SvelteIcon";
import TailwindIcon from "./Icons/TailwindIcon";
import VueIcon from "./Icons/VueIcon";
import SectionLayout from "./SectionLayout";

export default function TechnologiesSection() {

    const group1Icons:TechnologyIcon[] = [
        { icon: <HtmlIcon />, link: "https://developer.mozilla.org/en-US/docs/Web/HTML", name: "MDN HTML Homepage" },
        { icon: <AngularIcon />, link: "https://angular.io/", name: "Angular Framework Homepage" },
        { icon: <BulmaIcon />, link: "https://bulma.io/", name: "Bulma Homepage" },
        { icon: <CssIcon />, link: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: "MDN CSS Homepage" },
        { icon: <DenoIcon />, link: "https://deno.land/", name: "Deno Homepage" },
        { icon: <RubyOnRailsIcon />, link: "https://rubyonrails.org/", name: "Ruby On Rails Homepage" },
        { icon: <TailwindIcon />, link: "https://tailwindcss.com/", name: "Tailwind Homepage" }
    ]

    const group2Icons:TechnologyIcon[] = [
        { icon: <VueIcon />, link: "https://vuejs.org/", name: "Vue Framework Homepage" },
        { icon: <SolidityIcon />, link: "https://www.solidity.io/", name: "Solidity Homepage" },
        { icon: <JavascriptIcon />, link: "https://www.javascript.com/", name: "Javascript Language Homepage" },
        { icon: <GatsbyIcon />, link: "https://www.gatsbyjs.com/", name: "Gatsby Framework Homepage" },
        { icon: <FreshIcon />, link: "https://fresh.deno.dev/", name: "Fresh Framework Homepage" },
        { icon: <FigmaIcon />, link: "https://www.figma.com/", name: "Figma Homepage" },
        { icon: <GoIcon />, link: "https://go.dev/", name: "Go Language Homepage" }
    ]

    const group3Icons:TechnologyIcon[] = [
        { icon: <SvelteIcon />, link: "https://svelte.dev/", name: "Svelte Framework Homepage" },
        { icon: <RubyIcon />, link: "https://www.ruby-lang.org/en/", name: "Ruby Language Homepage" },
        { icon: <ReactIcon />, link: "https://reactjs.org/", name: "React Framework Homepage" },
        { icon: <NuxtIcon />, link: "https://nuxt.com/", name: "Nuxt Framework Homepage" },
        { icon: <NodeIcon />, link: "https://nodejs.org/en/", name: "Node.JS Homepage" },
        { icon: <NextJsIcon />, link: "https://nextjs.org/", name: "Next.JS Homepage" },
        { icon: <PostgresIcon />, link: "https://www.postgresql.org/", name: "PostgreSQL Homepage" }
    ]



    function slideIcon(technologyIcon:TechnologyIcon) {
        return (
            <div className="relative slide h-[100px] w-[200px]">
                <div className="h-[86px] w-[86px] group hover relative">
                    <a href={technologyIcon.link} aria-label={technologyIcon.name} title={technologyIcon.name}
                       className="w-full h-full relative flex items-center justify-center bg-white rounded-md border-lightgrey border group-hover:border-0 mt-1 z-20">
                        <div className="flex justify-center h-[48px] w-[48px]">
                            {technologyIcon.icon}
                        </div>
                    </a>

                    <div className="group-hover:animation-play group-hover:opacity-100 group-hover:animate-rotate transition-all duration-300 z-10 ease-linear gradient-border"></div>
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
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] animate-scroll hover:animation-pause">
                        {
                            [...group1Icons, ...group1Icons].map((technologyIcon, index) => {
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
                            [...group2Icons, ...group2Icons].map((technologyIcon, index) => {
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
                            [...group3Icons, ...group3Icons].map((technologyIcon, index) => {
                                return (
                                    <div key={technologyIcon.name + index}>
                                        {slideIcon(technologyIcon)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="absolute top-0 left-0 h-full w-[20px] sm:w-[50px] md:w-[100px] lg:w-[100px] bg-gradient-to-r from-brown via-brown dark:from-black to-transparent z-[1"></div>
                <div className="absolute top-0 right-0 h-full w-[20px] sm:w-[50px] md:w-[100px] lg:w-[100px] bg-gradient-to-l from-brown via-brown dark:from-black to-transparent z-[1]"></div>
            </div>


        </SectionLayout>
    )
}