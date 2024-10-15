import { render } from "@testing-library/react";
import FooterSection from "./FooterSection";

describe("FooterSection", () => {
  it("renders correctly", () => {
    const { container } = render(<FooterSection />);

    expect(container).toMatchSnapshot();
  });
});
