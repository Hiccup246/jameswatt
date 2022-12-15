import ThemeToggle from "./ThemeToggle";
import renderer from "react-test-renderer";
import { ThemeContext } from "./ThemeProvider";

describe("ThemeToggle", () => {
  it("renders correctly when no ThemeContext is set", () => {
    const tree = renderer.create(<ThemeToggle />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when a ThemeContext is set", () => {
    const tree = renderer
      .create(
        <ThemeContext.Provider
          value={{ siteTheme: "light", flipTheme: () => {} }}
        >
          <ThemeToggle />
        </ThemeContext.Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
