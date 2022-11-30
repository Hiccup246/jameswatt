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
    return (
        <SectionLayout isBgColorPrimary={false}>
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-14">
                Technologies I Dabble With
            </h1>

            <div className="w-full container relative overflow-hidden">
                <div className="w-full slider after:rotate-180 after:top-0 after:bottom-0 before:left:0 before:top:0 relative m-auto h-24">
                    <div className="flex slide-track animate-scroll mb-2 sm:mb-8">
                        <div className="slide h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <HtmlIcon />
                                </div>

                                <div className="hidden gradient-border gradient-border-dark transition-all duration-300 ease-linear gratient-rotate-animation gradient-border" data-v-6344a33b=""></div>
                                <div className="dark:hidden gradient-border gradient-border-light transition-all duration-300 ease-linear gratient-rotate-animation gradient-border" data-v-6344a33b=""></div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <AngularIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <BulmaIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <CssIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <DenoIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <RubyOnRailsIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <TailwindIcon />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full slide">
                    <div className="flex slide-track animate-scroll-reverse mb-2 sm:mb-8">
                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <FigmaIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <FreshIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <GatsbyIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <GoIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <JavascriptIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <SolidityIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <VueIcon />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full slide">
                    <div className="flex slide-track animate-scroll mb-2 sm:mb-8">
                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <NextJsIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <NodeIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <NuxtIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <ReactIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <RubyIcon />
                                </div>
                            </a>
                        </div>

                        <div className="slide-item h-24 w-48">
                            <a className="relative flex items-center justify-center bg-white h-[86px] w-[86px] rounded-md ring-1 ring-gray-200 hover:ring-0 dark:ring-0 mt-1">
                                <div className="w-12 h-12">
                                    <SvelteIcon />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}