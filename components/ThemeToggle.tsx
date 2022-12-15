import React from "react";
import MoonIcon from "./Icons/MoonIcon";
import SunIcon from "./Icons/SunIcon";
import { ThemeContext } from "./ThemeProvider";

function themeLabel(theme: string | undefined) {
  if (theme == undefined) return <></>;

  if (theme == "dark") {
    return "Light Mode";
  } else {
    return "Dark Mode";
  }
}

function themeIcon(theme: string | undefined) {
  if (theme == undefined) return <></>;

  if (theme == "dark") {
    return <SunIcon />;
  } else {
    return <MoonIcon />;
  }
}

export default function ThemeToggle() {
  const { siteTheme, flipTheme } = React.useContext(ThemeContext);

  if (!siteTheme) {
    return <></>;
  }

  return (
    <button
      className="hover group flex justify-center"
      onClick={() => flipTheme()}
    >
      <div className="mr-2 h-4 w-4">{themeIcon(siteTheme)}</div>

      <span className="group-hover:underline">{themeLabel(siteTheme)}</span>
    </button>
  );
}
