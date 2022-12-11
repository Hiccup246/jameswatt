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

test("Correctly renders the work experience section", async ({ page }) => {
  await page.getByRole("heading", { name: "My Experience" }).click();
  await page.waitForLoadState("networkidle");

  await expect(
    await page
      .getByRole("heading", { name: "UK Team Lead @ AplyiD" })
      .isVisible()
  ).toBeTruthy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ AplyiD" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ Hypebeat" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Intern Software Developer @ Halter" })
      .isVisible()
  ).toBeFalsy();

  await page.getByRole("button", { name: "AplyiD" }).nth(1).click();
  await page.waitForLoadState("networkidle");
  await expect(
    await page
      .getByRole("heading", { name: "UK Team Lead @ AplyiD" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ AplyiD" })
      .isVisible()
  ).toBeTruthy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ Hypebeat" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Intern Software Developer @ Halter" })
      .isVisible()
  ).toBeFalsy();

  await page.getByRole("button", { name: "Hypebeat" }).click();
  await page.waitForLoadState("networkidle");
  await expect(
    await page
      .getByRole("heading", { name: "UK Team Lead @ AplyiD" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ AplyiD" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ Hypebeat" })
      .isVisible()
  ).toBeTruthy();
  await expect(
    await page
      .getByRole("heading", { name: "Intern Software Developer @ Halter" })
      .isVisible()
  ).toBeFalsy();

  await page.getByRole("button", { name: "Halter" }).click();
  await page.waitForLoadState("networkidle");
  await expect(
    await page
      .getByRole("heading", { name: "UK Team Lead @ AplyiD" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ AplyiD" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Software Engineer @ Hypebeat" })
      .isVisible()
  ).toBeFalsy();
  await expect(
    await page
      .getByRole("heading", { name: "Intern Software Developer @ Halter" })
      .isVisible()
  ).toBeTruthy();
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
