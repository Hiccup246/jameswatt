import { test, expect } from "@playwright/test";
import { BOOKS } from "../constants/Books";
import { bookStatusSorter } from "../components/sections/BookshelfSection";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Home page displays the correct headers", async ({ page }) => {
  const workExperienceHeader = page.getByRole("heading", {
    name: "My Experience",
  });
  const projectShowcaseHeader = page.getByRole("heading", {
    name: "Project Showcase",
  });
  const technologiesHeader = page.getByRole("heading", {
    name: "Technologies I Dabble With",
  });
  const aboutMeHeader = page.getByRole("heading", { name: "Who am I?" });
  const bookshelfHeader = page.getByRole("heading", {
    name: "Books I'm Involved With",
  });
  const creditsHeader = page.getByRole("heading", {
    name: "The Work Which Inspired This Site",
  });

  await expect(workExperienceHeader).toBeVisible();
  await expect(projectShowcaseHeader).toBeVisible();
  await expect(technologiesHeader).toBeVisible();
  await expect(aboutMeHeader).toBeVisible();
  await expect(bookshelfHeader).toBeVisible();
  await expect(creditsHeader).toBeVisible();
});

test.describe("Work experience component", () => {
  test("Correctly displays all tab buttons", async ({ page }) => {
    const tabButtonOne = page.getByRole("button", { name: "Tripadvisor" });
    const tabButtonTwo = page.getByRole("button", { name: "AplyiD" }).first();
    const tabButtonThree = page.getByRole("button", { name: "AplyiD" }).nth(1);
    const tabButtonFour = page.getByRole("button", { name: "Hypebeat" });
    const tabButtonFive = page.getByRole("button", { name: "Halter" });
    const tabButtonSix = page.getByRole("button", { name: "BNZ" });
    const tabButtonSeven = page.getByRole("button", { name: "VUW" });

    await expect(tabButtonOne).toBeVisible();
    await expect(tabButtonTwo).toBeVisible();
    await expect(tabButtonThree).toBeVisible();
    await expect(tabButtonFour).toBeVisible();
    await expect(tabButtonFive).toBeVisible();
    await expect(tabButtonSix).toBeVisible();
    await expect(tabButtonSeven).toBeVisible();
  });

  test("Displays default selected work experience", async ({ page }) => {
    const firstWorkExperienceHeader = page.getByRole("heading", {
      name: "Software Engineer @ Tripadvisor",
    });

    await expect(firstWorkExperienceHeader).toBeDefined();
    await expect(firstWorkExperienceHeader).toBeVisible();
  });

  test("Hides non selected work experiences", async ({ page }) => {
    const secondWorkExperience = page.getByRole("heading", {
      name: "UK Team Lead @ AplyiD",
    });
    const thirdWorkExperience = page.getByRole("heading", {
      name: "Software Engineer @ AplyiD",
    });

    await expect(secondWorkExperience).toBeHidden();
    await expect(thirdWorkExperience).toBeHidden();
  });

  test("Should allow other work experiences to be selected", async ({
    page,
  }) => {
    const firstWorkExperienceHeader = page.getByRole("heading", {
      name: "Software Engineer @ Tripadvisor",
    });
    const fourthWorkExperience = page.getByRole("heading", {
      name: "Software Engineer @ Hypebeat",
    });

    await test.step("Should allow the fourth work experience to the selected", async () => {
      await page.getByRole("button", { name: "Hypebeat" }).click();
    });

    await test.step("Hides the previously selected work experience", async () => {
      await expect(firstWorkExperienceHeader).toBeHidden();
    });

    await expect(fourthWorkExperience).toBeVisible();
  });
});

test.describe("Bookshelf component", () => {
  const sortedBooks = BOOKS.slice().sort(bookStatusSorter);

  test("Displays 4 books", async ({ page }) => {
    const bookTitleOne = page.getByRole("cell", { name: sortedBooks[0].name });
    const bookTitleTwo = page.getByRole("cell", { name: sortedBooks[1].name });
    const bookTitleThree = page.getByRole("cell", {
      name: sortedBooks[2].name,
    });
    const bookTitleFour = page.getByRole("cell", { name: sortedBooks[3].name });

    await expect(bookTitleOne).toBeVisible();
    await expect(bookTitleTwo).toBeVisible();
    await expect(bookTitleThree).toBeVisible();
    await expect(bookTitleFour).toBeVisible();
  });

  test("Does not display more than 4 books ", async ({ page }) => {
    const bookTitleFive = page.getByRole("cell", { name: sortedBooks[4].name });

    await expect(bookTitleFive).toBeHidden();
  });

  test("Should allow all books to be displayed", async ({ page }) => {
    await test.step("Should allow the 'Show More' to be clicked", async () => {
      await page.getByRole("button", { name: "Show More Books" }).click();
    });

    const bookTitleFive = page.getByRole("cell", { name: sortedBooks[4].name });

    await expect(bookTitleFive).toBeVisible();
  });

  test("Should allow less books to be displayed if all are shown", async ({
    page,
  }) => {
    await test.step("Should allow the 'Show More' button to be clicked", async () => {
      await page.getByRole("button", { name: "Show More Books" }).click();
    });

    await test.step("Should allow the 'Show Less' button to be clicked", async () => {
      await page.getByRole("button", { name: "Show Less Books" }).click();
    });

    const bookTitleFive = page.getByRole("cell", { name: sortedBooks[4].name });

    await expect(bookTitleFive).toBeHidden();
  });
});

test.describe("About me component", () => {
  test("Email tooltip should not be displayed", async ({ page }) => {
    const emailTooltip = page.getByRole("tooltip", {
      name: "Email Address Copy email",
    });

    await expect(emailTooltip).toBeHidden();
  });

  test("Email tooltip should display when the email icon is hovered over", async ({
    page,
  }) => {
    const emailIcon = page
      .locator("section")
      .filter({
        hasText:
          "Who am I?I'm a software engineer based out of London, England and an xpat of New",
      })
      .locator("svg")
      .nth(2);
    await emailIcon.hover();

    const emailTooltip = page.getByRole("tooltip", {
      name: "Email Address Copy email",
    });
    await expect(emailTooltip).toBeVisible();
  });
});
