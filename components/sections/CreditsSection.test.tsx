import { render } from "@testing-library/react";
import CreditsSection from "./CreditsSection";

describe("CreditsSection", () => {
  it("renders correctly", () => {
    const { container } = render(<CreditsSection />);

    expect(container).toMatchSnapshot();
  });
});
