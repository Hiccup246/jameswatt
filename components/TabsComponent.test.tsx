import { expect, test, jest, describe } from "@jest/globals";
import TabsComponent, {
  calcTabButtonTranslation,
  largestChildHeight,
} from "./TabsComponent";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders the TabsComponent correctly", () => {
  const tree = renderer
    .create(
      <TabsComponent>
        <div aria-label="Panel 1">First Panel</div>
        <div aria-label="Panel 2">Second Panel</div>
      </TabsComponent>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders the first panel and all the correct tab buttons", () => {
  render(
    <TabsComponent>
      <div aria-label="Panel 1">First Panel</div>
      <div aria-label="Panel 2">Second Panel</div>
    </TabsComponent>
  );

  const panelOneText = screen.getByText("First Panel");
  const tabButtonOne = screen.getByRole("button", { name: "Panel 1" });
  const tabButtonTwo = screen.getByRole("button", { name: "Panel 2" });

  expect(panelOneText).toBeInTheDocument();
  expect(tabButtonOne).toBeInTheDocument();
  expect(tabButtonTwo).toBeInTheDocument();
});

test("when the second tab button is clicked it renders the second job", async () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
    })),
  });

  render(
    <TabsComponent>
      <div aria-label="Panel 1">First Panel</div>
      <div aria-label="Panel 2">Second Panel</div>
    </TabsComponent>
  );

  await userEvent.click(screen.getByRole("button", { name: "Panel 2" }));

  const job = screen.getByText("Panel 2");

  expect(job).toBeInTheDocument();
});

describe("calcTabButtonTranslation on a large device", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
      })),
    });
  });

  test("calcTabButtonTranslation called with 5 and 8", () => {
    expect(calcTabButtonTranslation(5, 8)).toBe("translateY(8px)");
  });

  test("calcTabButtonTranslation called with 0 and 0", () => {
    expect(calcTabButtonTranslation(0, 0)).toBe("translateY(0px)");
  });
});

describe("calcTabButtonTranslation on a small device", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
      })),
    });
  });

  test("calcTabButtonTranslation called with 10 and 3", () => {
    expect(calcTabButtonTranslation(10, 3)).toBe("translateX(10px)");
  });

  test("calcTabButtonTranslation called with 0 and 0", () => {
    expect(calcTabButtonTranslation(0, 0)).toBe("translateX(0px)");
  });
});

test("largestChildHeight called with empty div", () => {
  const mockElement: HTMLDivElement = document.createElement("div");
  expect(largestChildHeight(mockElement)).toBe(1000);
});

test("largestChildHeight called with div that has one experience panel", () => {
  const mockElement: HTMLDivElement = document.createElement("div");
  const mockChild: HTMLDivElement = document.createElement("div");
  jest.spyOn(mockChild, "clientHeight", "get").mockImplementation(() => 100);
  mockElement.appendChild(mockChild);

  expect(largestChildHeight(mockElement)).toBe(100);
});

test("largestChildHeight called with div that has two experience panels", () => {
  const mockElement: HTMLDivElement = document.createElement("div");
  const mockChildOne: HTMLDivElement = document.createElement("div");
  const mockChildTwo: HTMLDivElement = document.createElement("div");

  jest.spyOn(mockChildOne, "clientHeight", "get").mockImplementation(() => 100);
  mockElement.appendChild(mockChildOne);

  jest.spyOn(mockChildTwo, "clientHeight", "get").mockImplementation(() => 200);
  mockElement.appendChild(mockChildTwo);

  expect(largestChildHeight(mockElement)).toBe(200);
});

test("largestChildHeight called with div that has two experience panels with the same heights", () => {
  const mockElement: HTMLDivElement = document.createElement("div");
  const mockChildOne: HTMLDivElement = document.createElement("div");
  const mockChildTwo: HTMLDivElement = document.createElement("div");

  jest.spyOn(mockChildOne, "clientHeight", "get").mockImplementation(() => 10);
  mockElement.appendChild(mockChildOne);

  jest.spyOn(mockChildTwo, "clientHeight", "get").mockImplementation(() => 10);
  mockElement.appendChild(mockChildOne);

  expect(largestChildHeight(mockElement)).toBe(10);
});
