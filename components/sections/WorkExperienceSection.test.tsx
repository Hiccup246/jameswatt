import { expect, test, jest } from "@jest/globals";
import WorkExperienceSection from "./WorkExperienceSection";
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
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
    })),
  });

  render(<WorkExperienceSection jobs={dummyJobs} />);

  await userEvent.click(screen.getByRole("button", { name: "Dummy 2" }));

  const job = screen.getByText("Head Mocker");

  expect(job).toBeInTheDocument();
});
