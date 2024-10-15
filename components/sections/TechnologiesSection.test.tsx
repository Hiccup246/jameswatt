import { render } from "@testing-library/react";
import TechnologiesSection from "./TechnologiesSection";

describe("TechnologiesSection", () => {
  it("renders correctly", () => {
    const { container } = render(<TechnologiesSection />);
    expect(container).toMatchSnapshot();
  });
});
