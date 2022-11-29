import NextJsIcon from "./NextJsIcon";
import SectionLayout from "./SectionLayout";

export default function FooterSection() {
    return (
        <SectionLayout isBgColorPrimary={true}>
            <div className="flex justify-between text-sm">
                <div className="flex w-fit">
                   <h1 className="mr-1.5">Created with</h1> <a className="w-14 h-auto my-auto pb-0.5" href="https://nextjs.org/" aria-label="Next.js Homepage"><NextJsIcon /></a>
                </div>
                <h1 className="text-center text-sm">Designed & Built by James Watt</h1>
                <div>Toggle Theme</div>
            </div>
        </SectionLayout>
    )
}