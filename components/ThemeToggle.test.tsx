import ThemeToggle, { setDOMTheme } from "./ThemeToggle";
import renderer from "react-test-renderer";

describe("ThemeToggle", () => {
  it("renders the ThemeToggle correctly", () => {
    const tree = renderer.create(<ThemeToggle />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("setDOMTheme", () => {
  it("correctly sets localstorage and document body classes when darkMode is true", () => {
    Object.create(localStorage);
    Object.defineProperty(document, "documentElement", {
      configurable: true,
      value: document.createElement("document"),
    });

    setDOMTheme({ darkMode: true });

    expect(localStorage.theme).toBe("light");
    expect(document.documentElement.classList).not.toContain("dark");
  });

  it("correctly sets localstorage and document body classes when darkMode is false", () => {
    Object.create(localStorage);
    Object.defineProperty(document, "documentElement", {
      configurable: true,
      value: document.createElement("document"),
    });

    setDOMTheme({ darkMode: false });

    expect(localStorage.theme).toBe("dark");
    expect(document.documentElement.classList).toContain("dark");
  });
});
