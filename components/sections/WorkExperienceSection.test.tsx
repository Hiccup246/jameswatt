import { expect, test, jest, describe } from "@jest/globals";
import WorkExperienceSection, { calcTabButtonTranslation, largestChildHeight } from "./WorkExperienceSection";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const dummyJobs: Job[] = [
  {
    role: "Head Mouser",
    company: "Dummy 1",
    dateRange: "2020/09 - 2022/10",
    description: "My first dummy job",
    jobHighlights: ["highlight 1", "highlight 2"],
  },
  {
    role: "Head Mocker",
    company: "Dummy 2",
    dateRange: "2020/01 - 2022/02",
    description: "My second dummy job",
    jobHighlights: ["highlight 1", "highlight 2"],
  },
];

test("renders the WorkExperienceSection correctly", () => {
  const tree = renderer
    .create(<WorkExperienceSection jobs={dummyJobs} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders the first job and all the correct tab buttons", () => {
  render(<WorkExperienceSection jobs={dummyJobs} />);

  const jobRole = screen.getByText("Head Mouser");
  const tabButtonOne = screen.getByRole("button", { name: "Dummy 1" });
  const tabButtonTwo = screen.getByRole("button", { name: "Dummy 2" });

  expect(jobRole).toBeInTheDocument();
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

  render(<WorkExperienceSection jobs={dummyJobs} />);

  await userEvent.click(screen.getByRole("button", { name: "Dummy 2" }));

  const job = screen.getByText("Head Mocker");

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
  })

  test("calcTabButtonTranslation called with -1", () => {
    expect(calcTabButtonTranslation(-1)).toBe("translateY(calc((-1 * var(--tab-height)) + (-1 * var(--tab-margin-top)))")
  })
  
  test("calcTabButtonTranslation called with 0", () => {
    expect(calcTabButtonTranslation(0)).toBe("translateY(calc((0 * var(--tab-height)) + (0 * var(--tab-margin-top)))")
  })
  
  test("calcTabButtonTranslation called with 1", () => {
    expect(calcTabButtonTranslation(1)).toBe("translateY(calc((1 * var(--tab-height)) + (1 * var(--tab-margin-top)))")
  })
})

describe("calcTabButtonTranslation on a small device", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
      })),
    });
  })
  
  test("calcTabButtonTranslation called with -1", () => {
    expect(calcTabButtonTranslation(-1)).toBe("translateX(calc(-1 * var(--tab-width)))")
  })
  
  test("calcTabButtonTranslation called with 0", () => {
    expect(calcTabButtonTranslation(0)).toBe("translateX(calc(0 * var(--tab-width)))")
  })
  
  test("calcTabButtonTranslation called with 1", () => {
    expect(calcTabButtonTranslation(1)).toBe("translateX(calc(1 * var(--tab-width)))")
  })
})

test("largestChildHeight called with empty div", () => {
  const mockElement:HTMLDivElement = document.createElement("div")
  expect(largestChildHeight(mockElement)).toBe(1000)
})

test("largestChildHeight called with div that has one experience panel", () => {
  const mockElement:HTMLDivElement = document.createElement("div")
  const mockChild:HTMLDivElement = document.createElement("div")
  jest.spyOn(mockChild, 'clientHeight', 'get').mockImplementation(() => 100);
  mockElement.appendChild(mockChild)

  expect(largestChildHeight(mockElement)).toBe(100)
})

test("largestChildHeight called with div that has two experience panels", () => {
  const mockElement:HTMLDivElement = document.createElement("div")
  const mockChildOne:HTMLDivElement = document.createElement("div")
  const mockChildTwo:HTMLDivElement = document.createElement("div")

  jest.spyOn(mockChildOne, 'clientHeight', 'get').mockImplementation(() => 100);
  mockElement.appendChild(mockChildOne)

  jest.spyOn(mockChildTwo, 'clientHeight', 'get').mockImplementation(() => 200);
  mockElement.appendChild(mockChildTwo)

  expect(largestChildHeight(mockElement)).toBe(200)
})

test("largestChildHeight called with div that has two experience panels with the same heights", () => {
  const mockElement:HTMLDivElement = document.createElement("div")
  const mockChildOne:HTMLDivElement = document.createElement("div")
  const mockChildTwo:HTMLDivElement = document.createElement("div")

  jest.spyOn(mockChildOne, 'clientHeight', 'get').mockImplementation(() => 10);
  mockElement.appendChild(mockChildOne)

  jest.spyOn(mockChildTwo, 'clientHeight', 'get').mockImplementation(() => 10);
  mockElement.appendChild(mockChildOne)

  expect(largestChildHeight(mockElement)).toBe(10)
})