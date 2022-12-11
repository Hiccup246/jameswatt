import { test, expect } from "@playwright/test";

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
    const tabButtonOne = page.getByRole("button", { name: "AplyiD" }).first();
    const tabButtonTwo = page.getByRole("button", { name: "AplyiD" }).nth(1);
    const tabButtonThree = page.getByRole("button", { name: "Hypebeat" });
    const tabButtonFour = page.getByRole("button", { name: "Halter" });
    const tabButtonFive = page.getByRole("button", { name: "BNZ" });
    const tabButtonSix = page.getByRole("button", { name: "VUW" });

    await expect(tabButtonOne).toBeVisible();
    await expect(tabButtonTwo).toBeVisible();
    await expect(tabButtonThree).toBeVisible();
    await expect(tabButtonFour).toBeVisible();
    await expect(tabButtonFive).toBeVisible();
    await expect(tabButtonSix).toBeVisible();
  });

  test("Displays default selected work experience", async ({ page }) => {
    const firstWorkExperienceHeader = page.getByRole("heading", {
      name: "UK Team Lead @ AplyiD",
    });

    await expect(firstWorkExperienceHeader).toBeDefined();
    await expect(firstWorkExperienceHeader).toBeVisible();
  });

  test("Hides non selected work experiences", async ({ page }) => {
    const secondWorkExperience = page.getByRole("heading", {
      name: "Software Engineer @ AplyiD",
    });
    const thirdWorkExperience = page.getByRole("heading", {
      name: "Software Engineer @ Hypebeat",
    });

    await expect(secondWorkExperience).toBeHidden();
    await expect(thirdWorkExperience).toBeHidden();
  });

  test("Should allow other work experiences to be selected", async ({
    page,
  }) => {
    const firstWorkExperienceHeader = page.getByRole("heading", {
      name: "UK Team Lead @ AplyiD",
    });
    const thirdWorkExperience = page.getByRole("heading", {
      name: "Software Engineer @ Hypebeat",
    });

    await test.step("Should allow the third work experience to the selected", async () => {
      await page.getByRole("button", { name: "Hypebeat" }).click();
    });

    await test.step("Hides the previously selected work experience", async () => {
      await expect(firstWorkExperienceHeader).toBeHidden();
    });

    await expect(thirdWorkExperience).toBeVisible();
  });
});

test.describe("Bookshelf component", () => {
  test("Displays 4 books", async ({ page }) => {
    const bookTitleOne = page.getByRole("cell", {
      name: "The Black Swan: The Impact of the Highly Improbable",
    });
    const bookTitleTwo = page.getByRole("cell", {
      name: "The Pragmatic Programmer: From Journeyman to Master",
    });
    const bookTitleThree = page.getByRole("cell", {
      name: "Wordslut: A Feminist Guide to Taking Back the English Language",
    });
    const bookTitleFour = page.getByRole("cell", { name: "Steve Jobs" });

    await expect(bookTitleOne).toBeVisible();
    await expect(bookTitleTwo).toBeVisible();
    await expect(bookTitleThree).toBeVisible();
    await expect(bookTitleFour).toBeVisible();
  });

  test("Does not display more than 4 books ", async ({ page }) => {
    const bookTitleFive = page.getByRole("cell", {
      name: "Brave New World",
    });
    const bookTitleLast = page.getByRole("cell", {
      name: "The Power of Now",
    });

    await expect(bookTitleFive).toBeHidden();
    await expect(bookTitleLast).toBeHidden();
  });

  test("Should allow all books to be displayed", async ({ page }) => {
    await test.step("Should allow the 'Show More' to be clicked", async () => {
      await page.getByRole("button", { name: "Show More Books" }).click();
    });

    const bookTitleFive = page.getByRole("cell", {
      name: "Brave New World",
    });
    const lastBook = page.getByRole("cell", { name: "The Power of Now" });

    await expect(bookTitleFive).toBeVisible();
    await expect(lastBook).toBeVisible();
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

    const bookTitleFive = page.getByRole("cell", {
      name: "Brave New World",
    });
    const lastBook = page.getByRole("cell", { name: "The Power of Now" });

    await expect(bookTitleFive).toBeHidden();
    await expect(lastBook).toBeHidden();
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
