import { render } from "@testing-library/react";
import ShowcaseProject from "./ShowcaseProject";

const mockShowCaseProject: ShowcaseProject = {
  websiteUrl: "https://wwww.site.com",
  githubRepoUrl: "https://www.github.com",
  projectName: "Project One",
  projectImageSrc: "https://www.github.com/image.png",
  firstPublished: new Date("2022-02-12"),
};

describe("ShowcaseProject", () => {
  it("renders correctly", () => {
    const { container } = render(<ShowcaseProject {...mockShowCaseProject} />);

    expect(container).toMatchSnapshot();
  });
});
