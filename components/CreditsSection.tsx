import BrittanyChiangIcon from "./BrittanyChiangIcon";
import FontAwesomeIcon from "./FontAwesomeIcon";
import Icons8Icon from "./Icons8Icon";
import SectionLayout from "./SectionLayout";
import Image from "next/image";
import FreshIcon from "./FreshIcon";

export default function CreditsSection() {
    return (
        <SectionLayout isBgColorPrimary={false}>
            <h1 className="self-center text-2xl sm:text-3xl font-bold mb-2">
                The Work Which Inspired This Site
            </h1>

            <h2 className="text-center mb-10">&quot;Good artists borrow, great artists steal&quot; - Pablo Picasso</h2>

            <div>
                <ul>
                    <li>
                        <a className="hover:underline" href="https://icons8.com/" aria-label="Icons8 Homepage">
                            Icons8 (Icons)
                        </a>

                        <div className="h-4 w-4">
                            <Icons8Icon />
                        </div>
                    </li>

                    <li>
                        <a className="hover:underline" href="https://fontawesome.com/" aria-label="Font Awesome Homepage">
                            Font Awesome (Icons)
                        </a>

                        <div className="h-4 w-4">
                            <FontAwesomeIcon />
                        </div>
                    </li>

                    <li>
                        <a className="hover:underline" href="https://brittanychiang.com/" aria-label="Brittany Chiang Website">
                            Brittany Chiang (Inspired the programming experience component)
                        </a>

                        <div className="h-4 w-4">
                            <BrittanyChiangIcon />
                        </div>
                    </li>

                    <li>
                        <a className="hover:underline" href="https://marguerite.io/" aria-label="Marguerite Roth Website">
                            Marguerite Roth (Inspired the bookshelf component)
                        </a>

                        <div className="h-5 w-5 relative">
                            <Image src="/marguerite.webp"
                                   fill
                                   sizes="(min-width: 640px) 17px,
                                          (min-width: 785px) 17px,
                                          17px"
                                   alt="Marguerite Roth Icon" />
                        </div>
                    </li>

                    <li>
                        <a className="hover:underline" href="https://fresh.deno.dev/" aria-label="Fresh Framework Homepage">
                            Fresh Framework (Dripping Design + Project Showcase)
                        </a>

                        <div className="h-5 w-5">
                            <FreshIcon />
                        </div>
                    </li>
                </ul>
            </div>
        </SectionLayout>
    )
}
