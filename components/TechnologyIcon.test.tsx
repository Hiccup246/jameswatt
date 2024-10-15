import { render } from "@testing-library/react";
import TechnologyIcon from "./TechnologyIcon";

const mockTechnologyIcon: LinkedIcon = {
  link: "www.example.com",
  name: "example icon",
  icon: <svg></svg>,
};

describe("TechnologyIcon", () => {
  it("renders correctly", () => {
    const { container } = render(<TechnologyIcon icon={mockTechnologyIcon} />);

    expect(container).toMatchSnapshot();
  });
});
