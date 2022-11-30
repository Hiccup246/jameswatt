import { useEffect, useState } from "react";
import MoonIcon from "./Icons/MoonIcon";
import NextJsIcon from "./Icons/NextJsIcon";
import SectionLayout from "./SectionLayout";
import SunIcon from "./Icons/SunIcon";

export default function FooterSection() {
    const [darkMode, setDarkMode] = useState<boolean>()

    function toggleTheme() {
        if (document.documentElement.classList.contains("dark")) {
            setDarkMode(false)
            localStorage.theme = "light"
            document.documentElement.classList.remove("dark")
        } else {
            setDarkMode(true)
            localStorage.theme = "dark"
            document.documentElement.classList.add("dark")
        }
    }

    function setTheme() {
        if (document.documentElement.classList.contains("dark")) {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }

    function toggleText() {
        if (darkMode != null) {
            return (darkMode ? "Light Mode" : "Dark Mode")
        } else {
            return (<></>)
        }
    }

    function toggleIcon() {
        if (darkMode != null) {
            return (darkMode ? <SunIcon /> : <MoonIcon />)
        } else {
            return (<></>)
        }
    }

    useEffect(() => {
        setTheme()
      }, [])

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

                <button className="flex justify-center group hover" onClick={toggleTheme}>
                    <div className="h-4 w-4 mr-2">
                        {toggleIcon()}
                    </div>

                    <span className="group-hover:underline">
                        {toggleText()}
                    </span>
                </button>
            </div>
        </SectionLayout>
    )
}