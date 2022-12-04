import { useEffect, useState } from "react";
import MoonIcon from "../Icons/MoonIcon";
import NextJsIcon from "../Icons/NextJsIcon";
import SectionLayout from "../layouts/SectionLayout";
import SunIcon from "../Icons/SunIcon";

export default function FooterSection() {
  const [darkMode, setDarkMode] = useState<boolean>();

  function toggleTheme() {
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(false);
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }

  function setInitialTheme() {
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }

  function toggleText() {
    if (darkMode != null) {
      return darkMode ? "Light Mode" : "Dark Mode";
    } else {
      return "";
    }
  }

  function toggleIcon() {
    if (darkMode != null) {
      return darkMode ? <SunIcon /> : <MoonIcon />;
    } else {
      return <></>;
    }
  }

  useEffect(() => {
    setInitialTheme();
  }, []);

  return (
    <SectionLayout isBgColorPrimary={true} largeBottomPadding={false}>
      <div className="grid grid-cols-1 text-center text-sm md:grid-cols-3">
        <div className="mb-6 flex justify-center md:mb-0">
          <h1 className="mr-1.5">Created with</h1>

          <a
            className="h-auto w-14 pt-1"
            href="https://nextjs.org/"
            aria-label="Next.js Homepage"
          >
            <NextJsIcon />
          </a>
        </div>

        <h1 className="mb-6 md:mb-0">Designed & Built by James Watt</h1>

        <button
          className="hover group flex justify-center"
          onClick={toggleTheme}
        >
          <div className="mr-2 h-4 w-4">{toggleIcon()}</div>

          <span className="group-hover:underline">{toggleText()}</span>
        </button>
      </div>
    </SectionLayout>
  );
}
