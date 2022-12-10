import { expect, test } from "@jest/globals";
import TechnologyIcon from "./TechnologyIcon";
import renderer from "react-test-renderer";

const mockTechnologyIcon: TechnologyIcon = {
  link: "www.example.com",
  name: "example icon",
  icon: <svg></svg>,
};

test("renders the TechnologyIcon correctly", () => {
  const tree = renderer
    .create(<TechnologyIcon icon={mockTechnologyIcon} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
