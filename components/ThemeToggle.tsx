import { useEffect, useState } from "react";
import MoonIcon from "./Icons/MoonIcon";
import SunIcon from "./Icons/SunIcon";

function darkModeEnabled() {
    if (!document) return false;
    
    return document.documentElement.classList.contains("dark")
}

function setThemeForDom(darkMode:boolean | undefined) {
    if (!localStorage || !document) return;

    if (darkMode) {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
    } else {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    }
}

function buttonText(darkMode:boolean | undefined) {
    if (darkMode == undefined) return <></>

    if (darkMode) {
        return "Light Mode";
    } else {
        return "Dark Mode";
    }
}

function buttonIcon(darkMode:boolean | undefined) {
    if (darkMode == undefined) return <></>

    if (darkMode) {
        return <SunIcon />;
    } else {
        return <MoonIcon />;
    }
}

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>();

    function toggleTheme() {
        if (darkModeEnabled()) {
            setDarkMode(false);
            setThemeForDom(darkMode)
        } else {
            setDarkMode(true);
            setThemeForDom(darkMode)
        }
    }
  
    function setInitialTheme() {
        if (darkModeEnabled()) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }
  
    // function buttonText() {
    //     if (darkMode == undefined) return <></>

    //     if (darkMode) {
    //         return "Light Mode";
    //     } else {
    //         return "Dark Mode";
    //     }
    // }
  
    // function buttonIcon() {
    //     if (darkMode == undefined) return <></>

    //     if (darkMode) {
    //         return <SunIcon />;
    //     } else {
    //         return <MoonIcon />;
    //     }
    // }
  
    useEffect(() => {
        setInitialTheme();
    }, []);

    return (
        <button
          className="hover group flex justify-center"
          onClick={toggleTheme}
        >
          <div className="mr-2 h-4 w-4">{buttonIcon(darkMode)}</div>

          <span className="group-hover:underline">{buttonText(darkMode)}</span>
        </button>
    );
}