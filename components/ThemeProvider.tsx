"use client";

import React from "react";

export const ThemeContext = React.createContext<{
  siteTheme: string | undefined;
  flipTheme: Function;
}>({ siteTheme: undefined, flipTheme: () => {} });

export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

export function setDOMTheme({ darkMode }: { darkMode: boolean }) {
  if (!localStorage || !document) return;

  if (darkMode) {
    localStorage.theme = "dark";
    document.documentElement.classList.add("dark");
  } else {
    localStorage.theme = "light";
    document.documentElement.classList.remove("dark");
  }
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteTheme, setSiteTheme] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (isDarkMode()) {
      setSiteTheme("dark");
    } else {
      setSiteTheme("light");
    }
  }, []);

  function flipTheme() {
    if (isDarkMode()) {
      setSiteTheme("light");
      setDOMTheme({ darkMode: false });
    } else {
      setSiteTheme("dark");
      setDOMTheme({ darkMode: true });
    }
  }

  return (
    <ThemeContext.Provider value={{ siteTheme, flipTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
