import { expect, test } from "@jest/globals";
import TabButton from "./TabButton";
import renderer from "react-test-renderer";

test("renders the TabButton correctly", () => {
  const tree = renderer
    .create(
      <TabButton
        companyName="Company One"
        activated={true}
        clickHandler={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
