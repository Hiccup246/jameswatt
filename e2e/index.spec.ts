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

test("Correctly renders the book sheld section", async ({ page }) => {
  await page.getByRole("heading", { name: "Books I'm Involved With" }).click();
  await page.waitForLoadState("networkidle");

  await expect(
    await page
      .getByRole("heading", {
        name: "The Black Swan: The Impact of the Highly Improbable",
      })
      .isVisible()
  ).toBeTruthy();
  await expect(
    await page.getByRole("heading", { name: "The Power of Now" }).isVisible()
  ).toBeFalsy();

  await page.getByRole("button", { name: "Show More/Less Books" }).click();
  await expect(
    await page
      .getByRole("heading", {
        name: "The Black Swan: The Impact of the Highly Improbable",
      })
      .isVisible()
  ).toBeTruthy();
  await page.getByRole("heading", { name: "The Power of Now" }).click();
  await expect(
    await page.getByRole("heading", { name: "The Power of Now" }).isVisible()
  ).toBeTruthy();

  await page.getByRole("button", { name: "Show More/Less Books" }).click();
  await expect(
    await page.getByRole("heading", { name: "The Power of Now" }).isVisible()
  ).toBeFalsy();
});
