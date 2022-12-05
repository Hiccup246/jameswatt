import { useEffect, useState } from "react";
import MoonIcon from "./Icons/MoonIcon";
import SunIcon from "./Icons/SunIcon";

function setDOMTheme(darkMode: boolean | undefined) {
  if (!localStorage || !document) return;

  if (darkMode) {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  }
}

function themeLabel(darkMode: boolean | undefined) {
  if (darkMode == undefined) return <></>;

  if (darkMode) {
    return "Light Mode";
  } else {
    return "Dark Mode";
  }
}

function themeIcon(darkMode: boolean | undefined) {
  if (darkMode == undefined) return <></>;

  if (darkMode) {
    return <SunIcon />;
  } else {
    return <MoonIcon />;
  }
}

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>();

  function toggleTheme() {
    if (darkMode) {
      setDarkMode(false);
      setDOMTheme(darkMode);
    } else {
      setDarkMode(true);
      setDOMTheme(darkMode);
    }
  }

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  return (
    <button className="hover group flex justify-center" onClick={toggleTheme}>
      <div className="mr-2 h-4 w-4">{themeIcon(darkMode)}</div>

      <span className="group-hover:underline">{themeLabel(darkMode)}</span>
    </button>
  );
}