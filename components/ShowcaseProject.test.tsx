import ShowcaseProject from "./ShowcaseProject";
import renderer from "react-test-renderer";

const dummyShowCaseProject: ShowcaseProject = {
  websiteUrl: "https://wwww.site.com",
  githubRepoUrl: "https://www.github.com",
  projectName: "Project One",
  projectImageSrc: "https://www.github.com/image.png",
  firstPublished: new Date("2022-02-12"),
};

describe("ShowcaseProject", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ShowcaseProject {...dummyShowCaseProject} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
