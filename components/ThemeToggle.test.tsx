import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "./ThemeProvider";
import { render } from "@testing-library/react";

describe("ThemeToggle", () => {
  it("renders correctly when no ThemeContext is set", () => {
    const { container } = render(<ThemeToggle />);

    expect(container).toMatchSnapshot();
  });

  it("renders correctly when a ThemeContext is set", () => {
    const { container } = render(
      <ThemeContext.Provider
        value={{ siteTheme: "light", flipTheme: () => {} }}
      >
        <ThemeToggle />
      </ThemeContext.Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
