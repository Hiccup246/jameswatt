import renderer from "react-test-renderer";
import ThemeProvider, { setDOMTheme } from "./ThemeProvider";

describe("ThemeProvider", () => {
  it("correctly renders its children", () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <div>
            <p>Hello There</p>
          </div>
        </ThemeProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("setDOMTheme", () => {
  it("correctly sets localstorage and document body classes when darkMode is false", () => {
    Object.create(localStorage);
    Object.defineProperty(document, "documentElement", {
      configurable: true,
      value: document.createElement("document"),
    });

    setDOMTheme({ darkMode: false });

    expect(localStorage.theme).toBe("light");
    expect(document.documentElement.classList).not.toContain("dark");
  });

  it("correctly sets localstorage and document body classes when darkMode is true", () => {
    Object.create(localStorage);
    Object.defineProperty(document, "documentElement", {
      configurable: true,
      value: document.createElement("document"),
    });

    setDOMTheme({ darkMode: true });

    expect(localStorage.theme).toBe("dark");
    expect(document.documentElement.classList).toContain("dark");
  });
});
