import { expect, test } from "@jest/globals";
import ExperiencePanel from "./ExperiencePanel";
import renderer from "react-test-renderer";

const dummyJob: Job = {
  role: "Head Mouser",
  company: "Dummy 1",
  dateRange: "2020/09 - 2022/10",
  description: "My first dummy job",
  jobHighlights: ["highlight 1", "highlight 2"],
};

test("renders the ExperiencePanel correctly", () => {
  const tree = renderer
    .create(<ExperiencePanel job={dummyJob} activated={true} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
