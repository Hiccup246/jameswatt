import ConveyorBelt from "./ConveyorBelt";
import renderer from "react-test-renderer";

describe("ConveyorBelt", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ConveyorBelt>
          <div>Div 1</div>
          <div>Div 2</div>
        </ConveyorBelt>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
