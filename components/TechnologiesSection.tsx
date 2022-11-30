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
import ReactIcon from "./Icons/ReactIcon";
import RubyIcon from "./Icons/RubyIcon";
import RubyOnRailsIcon from "./Icons/RubyOnRailsIcon";
import SolidityIcon from "./Icons/SolidityIcon";
import SvelteIcon from "./Icons/SvelteIcon";
import TailwindIcon from "./Icons/TailwindIcon";
import VueIcon from "./Icons/VueIcon";
import SectionLayout from "./SectionLayout";

export default function TechnologiesSection() {

    const group1Icons:JSX.Element[] = [
        <HtmlIcon />,
        <AngularIcon />,
        <BulmaIcon />,
        <CssIcon />,
        <DenoIcon />,
        <RubyOnRailsIcon />,
        <TailwindIcon />
    ]

    const group2Icons:JSX.Element[] = [
        <VueIcon />,
        <SolidityIcon />,
        <JavascriptIcon />,
        <GatsbyIcon />,
        <FreshIcon />,
        <FigmaIcon />,
        <GoIcon />
    ]

    const group3Icons:JSX.Element[] = [
        <SvelteIcon />,
        <RubyIcon />,
        <ReactIcon />,
        <NuxtIcon />,
        <NodeIcon />,
        <NextJsIcon />
    ]



    function slideIcon(icon:JSX.Element) {
        return (
            <div className="relative group hover slide h-24 w-24 mr-24">
                <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 group-hover:ring-0 mt-1 z-20">
                    <div className="h-[48px] w-[48px]">
                        {icon}
                    </div>
                </a>

                <div className="group-hover:animation-play group-hover:opacity-100 group-hover:animate-rotate transition-all duration-300 z-10 ease-linear real-gradient-border"></div>
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
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] animate-scroll hover:animation-pause mb-2 sm:mb-8">
                        {
                            [...group1Icons, ...group1Icons].map((icon, index) => (<div key={index}>{slideIcon(icon)}</div>))
                        }
                    </div>
                </div>

                <div className="w-full relative m-auto h-24">
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] hover:animation-pause animate-scroll-reverse">
                        {
                            [...group2Icons, ...group2Icons].map((icon, index) => (<div key={index}>{slideIcon(icon)}</div>))
                        }
                    </div>
                </div>

                <div className="w-full relative m-auto h-24">
                    <div className="flex slide-track w-[calc(var(--slider-item-width)*var(--all-slider-items))] hover:animation-pause animate-scroll mb-2 sm:mb-8">
                        {
                            [   ...group3Icons, ...group3Icons].map((icon, index) => (<div key={icon.type.name + index}>{slideIcon(icon)}</div>))
                        }
                    </div>
                </div>

                <div className="absolute top-0 left-0 h-full w-[20px] sm:w-[50px] md:w-[100px] lg:w-[100px] bg-gradient-to-r from-brown via-brown dark:from-black to-transparent z-[1"></div>
                <div className="absolute top-0 right-0 h-full w-[20px] sm:w-[50px] md:w-[100px] lg:w-[100px] bg-gradient-to-l from-brown via-brown dark:from-black to-transparent z-[1]"></div>
            </div>


        </SectionLayout>
    )
}