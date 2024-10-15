import TabsManager, {
  calcTabButtonTranslation,
  largestChildHeight,
} from "./TabsManager";
import { render, screen } from "@testing-library/react";

describe("TabsManager", () => {
  describe("When on a large device", () => {
    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
        })),
      });
    });

    it("renders correctly when given multiple children", () => {
      const { container } = render(
        <TabsManager>
          <div title="Panel 1" key="Panel 1">
            First Panel
          </div>
          <div title="Panel 2" key="Panel 2">
            Second Panel
          </div>
        </TabsManager>
      );

      expect(container).toMatchSnapshot();
    });

    it("renders the correct tab buttons", () => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
        })),
      });

      render(
        <TabsManager>
          <div title="Panel 1" key="Panel 1">
            First Panel
          </div>
          <div title="Panel 2" key="Panel 2">
            Second Panel
          </div>
        </TabsManager>
      );

      const tabButtonOne = screen.getByRole("button", { name: "Panel 1" });
      const tabButtonTwo = screen.getByRole("button", { name: "Panel 2" });

      expect(tabButtonOne).toBeInTheDocument();
      expect(tabButtonTwo).toBeInTheDocument();
    });

    it("renders the correct tab panels", () => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
        })),
      });

      render(
        <TabsManager>
          <div title="Panel 1" key="Panel 1">
            First Panel
          </div>
          <div title="Panel 2" key="Panel 2">
            Second Panel
          </div>
        </TabsManager>
      );

      const panelOneText = screen.getByText("First Panel");
      const panelTwoText = screen.getByText("Second Panel");

      expect(panelOneText).toBeInTheDocument();
      expect(panelTwoText).toBeInTheDocument();
    });
  });

  describe("When on a small device", () => {
    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
        })),
      });
    });

    it("renders correctly when given multiple children", () => {
      const { container } = render(
        <TabsManager>
          <div title="Panel 1" key="Panel 1">
            First Panel
          </div>
          <div title="Panel 2" key="Panel 2">
            Second Panel
          </div>
        </TabsManager>
      );

      expect(container).toMatchSnapshot();
    });

    it("renders the correct tab buttons", () => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
        })),
      });

      render(
        <TabsManager>
          <div title="Panel 1" key="Panel 1">
            First Panel
          </div>
          <div title="Panel 2" key="Panel 2">
            Second Panel
          </div>
        </TabsManager>
      );

      const tabButtonOne = screen.getByRole("button", { name: "Panel 1" });
      const tabButtonTwo = screen.getByRole("button", { name: "Panel 2" });

      expect(tabButtonOne).toBeInTheDocument();
      expect(tabButtonTwo).toBeInTheDocument();
    });

    it("renders the correct tab panels", () => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
        })),
      });

      render(
        <TabsManager>
          <div title="Panel 1" key="Panel 1">
            First Panel
          </div>
          <div title="Panel 2" key="Panel 2">
            Second Panel
          </div>
        </TabsManager>
      );

      const panelOneText = screen.getByText("First Panel");
      const panelTwoText = screen.getByText("Second Panel");

      expect(panelOneText).toBeInTheDocument();
      expect(panelTwoText).toBeInTheDocument();
    });
  });
});

describe("calcTabButtonTranslation", () => {
  describe("When on a large device", () => {
    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
        })),
      });
    });

    it("returns the correct Y translation when called with 5 and 8", () => {
      expect(calcTabButtonTranslation(5, 8)).toBe("translateY(8px)");
    });

    it("returns the correct Y translation when called with 0 and 0", () => {
      expect(calcTabButtonTranslation(0, 0)).toBe("translateY(0px)");
    });
  });

  describe("When on a small device", () => {
    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
        })),
      });
    });

    it("returns the correct X translation when called with 10 and 3", () => {
      expect(calcTabButtonTranslation(10, 3)).toBe("translateX(10px)");
    });

    it("returns the correct X translation when called with 0 and 0", () => {
      expect(calcTabButtonTranslation(0, 0)).toBe("translateX(0px)");
    });
  });
});

describe("largestChildHeight", () => {
  it("returns its default value when passed an empty element", () => {
    const mockElement: HTMLDivElement = document.createElement("div");
    expect(largestChildHeight(mockElement)).toBe(1000);
  });

  it("returns the height of the child element when given an element with one inner child", () => {
    const mockElement: HTMLDivElement = document.createElement("div");
    const mockChild: HTMLDivElement = document.createElement("div");
    jest.spyOn(mockChild, "clientHeight", "get").mockImplementation(() => 100);
    mockElement.appendChild(mockChild);

    expect(largestChildHeight(mockElement)).toBe(100);
  });

  it("returns the height of the largest child when given an element with multiple inner children", () => {
    const mockElement: HTMLDivElement = document.createElement("div");
    const mockChildOne: HTMLDivElement = document.createElement("div");
    const mockChildTwo: HTMLDivElement = document.createElement("div");

    jest
      .spyOn(mockChildOne, "clientHeight", "get")
      .mockImplementation(() => 100);
    mockElement.appendChild(mockChildOne);

    jest
      .spyOn(mockChildTwo, "clientHeight", "get")
      .mockImplementation(() => 200);
    mockElement.appendChild(mockChildTwo);

    expect(largestChildHeight(mockElement)).toBe(200);
  });
});
