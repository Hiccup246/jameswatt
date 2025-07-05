import { render } from "@testing-library/react";
import ConveyorBelt from "./ConveyorBelt";

describe("ConveyorBelt", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ConveyorBelt>
        <div>Div 1</div>
        <div>Div 2</div>
      </ConveyorBelt>,
    );

    expect(container).toMatchSnapshot();
  });
});
