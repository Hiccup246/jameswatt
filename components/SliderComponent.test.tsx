import SliderComponent from "./SliderComponent";
import renderer from "react-test-renderer";

describe("SliderComponent", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <SliderComponent>
          <div>Div 1</div>
          <div>Div 2</div>
        </SliderComponent>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
