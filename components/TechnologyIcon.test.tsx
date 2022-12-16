import TechnologyIcon from "./TechnologyIcon";
import renderer from "react-test-renderer";

const mockTechnologyIcon: LinkedIcon = {
  link: "www.example.com",
  name: "example icon",
  icon: <svg></svg>,
};

describe("TechnologyIcon", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<TechnologyIcon icon={mockTechnologyIcon} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
