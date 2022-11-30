import BrittanyChiangIcon from "./Icons/BrittanyChiangIcon";
import FontAwesomeIcon from "./Icons/FontAwesomeIcon";
import Icons8Icon from "./Icons/Icons8Icon";
import SectionLayout from "./SectionLayout";
import Image from "next/image";
import FreshIcon from "./Icons/FreshIcon";

export default function CreditsSection() {
    return (
        <SectionLayout isBgColorPrimary={false}>
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-2">
                The Work Which Inspired This Site
            </h1>
            
            <h2 className="text-center mb-10">
                &quot;Good artists borrow, great artists steal&quot; - Pablo Picasso
            </h2>

            <div className="text-center">
                <ul>
                    <li className="group hover mb-5">
                        <a className="group-hover:underline pr-2" href="https://icons8.com/" aria-label="Icons8 Homepage">
                            Icons8 (Icons)
                        </a>

                        <a className="inline-block h-4 w-4 opacity-0 -rotate-45 group-hover:opacity-70 duration-500 transition-opacity-transform ease-in-out translate-x-[-8px] group-hover:transform-none align-middle mb-1" href="https://icons8.com/" aria-label="Icons8 Homepage">
                            <Icons8Icon />
                        </a>
                    </li>

                    <li className="group hover mb-5">
                        <a className="group-hover:underline pr-2" href="https://fontawesome.com/" aria-label="Font Awesome Homepage">
                            Font Awesome (Icons)
                        </a>

                        <a className="inline-block h-4 w-4 opacity-0 -rotate-45 group-hover:opacity-70 duration-500 transition-opacity-transform ease-in-out translate-x-[-8px] group-hover:transform-none align-middle mb-1" href="https://fontawesome.com/" aria-label="Font Awesome Homepage">
                            <FontAwesomeIcon />
                        </a>
                    </li>

                    <li className="group hover mb-5">
                        <a className="group-hover:underline pr-2" href="https://brittanychiang.com/" aria-label="Brittany Chiang Website">
                            Brittany Chiang (Inspired the programming experience component)
                        </a>

                        <a className="inline-block h-4 w-4 opacity-0 -rotate-45 group-hover:opacity-70 duration-500 transition-opacity-transform ease-in-out translate-x-[-8px] group-hover:transform-none align-middle mb-2" href="https://brittanychiang.com/" aria-label="Brittany Chiang Website">
                            <BrittanyChiangIcon />
                        </a>
                    </li>

                    <li className="group hover mb-5">
                        <a className="group-hover:underline pr-2" href="https://marguerite.io/" aria-label="Marguerite Roth Website">
                            Marguerite Roth (Inspired the bookshelf component)
                        </a>

                        <a className="h-6 w-6 relative inline-block opacity-0 -rotate-45 group-hover:opacity-70 duration-500 transition-opacity-transform ease-in-out translate-x-[-8px] group-hover:transform-none align-middle mb-1" href="https://marguerite.io/" aria-label="Marguerite Roth Website">
                            <Image src="/marguerite.webp"
                                   fill
                                   sizes="(min-width: 640px) 300px,
                                          (min-width: 785px) 300px,
                                          300px"
                                   alt="Marguerite Roth Icon" />
                        </a>
                    </li>

                    <li className="group hover mb-5">
                        <a className="group-hover:underline pr-2" href="https://fresh.deno.dev/" aria-label="Fresh Framework Homepage">
                            Fresh Framework (Dripping Design + Project Showcase)
                        </a>

                        <a className="inline-block h-6 w-6 opacity-0 -rotate-45 group-hover:opacity-70 duration-500 transition-opacity-transform ease-in-out translate-x-[-8px] group-hover:transform-none align-middle mb-1" href="https://fresh.deno.dev/" aria-label="Fresh Framework Homepage">
                            <FreshIcon />
                        </a>
                    </li>

                    <li className="group hover mb-5">
                        <a className="group-hover:underline pr-2" href="https://www.joshwcomeau.com/" aria-label="Josh Comeau Website">
                            Josh Comeau (Moon Icon)
                        </a>

                        <a className="relative inline-block h-6 w-6 opacity-0 -rotate-45 group-hover:opacity-70 duration-500 transition-opacity-transform ease-in-out translate-x-[-8px] group-hover:transform-none align-middle mb-1" href="https://www.joshwcomeau.com/" aria-label="Josh Comeau Website">
                            <Image src="/josh-comeau.webp"
                                   fill
                                   sizes="(min-width: 640px) 170px,
                                          (min-width: 785px) 170px,
                                          170px"
                                   alt="Josh Comeau Icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </SectionLayout>
    )
}
