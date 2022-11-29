import MoonIcon from "./MoonIcon";
import NextJsIcon from "./NextJsIcon";
import SectionLayout from "./SectionLayout";
import SunIcon from "./SunIcon";

export default function FooterSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <div className="grid grid-cols-1 md:grid-cols-3 text-sm text-center">
                <div className="flex justify-center mb-6 md:mb-0">
                    <h1 className="mr-1.5">
                        Created with
                    </h1>
                    
                    <a className="w-14 h-auto pt-1" href="https://nextjs.org/" aria-label="Next.js Homepage">
                        <NextJsIcon />
                    </a>
                </div>

                <h1 className="mb-6 md:mb-0">
                    Designed & Built by James Watt
                </h1>

                <button className="flex justify-center group hover">
                    <div className="h-3.5 w-3.5 mr-3">
                        <MoonIcon />
                    </div>

                    <span className="group-hover:underline">
                        Dark Mode
                    </span>

                    <div className="h-5 w-7 ml-3">
                        <SunIcon />
                    </div>
                </button>
            </div>
        </SectionLayout>
    )
}