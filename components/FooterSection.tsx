import NextJsIcon from "./NextJsIcon";
import SectionLayout from "./SectionLayout";

export default function FooterSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <div className="grid grid-cols-1 md:grid-cols-3 text-sm text-center">
                <div className="flex justify-center">
                   <h1 className="mr-1.5">Created with</h1> <a className="w-14 h-auto pt-1" href="https://nextjs.org/" aria-label="Next.js Homepage"><NextJsIcon /></a>
                </div>
                <h1 className="text-center text-sm">Designed & Built by James Watt</h1>
                <div>Toggle Theme</div>
            </div>
        </SectionLayout>
    )
}