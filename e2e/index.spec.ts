import { test, expect } from "@playwright/test";

test("Index page displays all sections", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "My Experience" })
  ).not.toBeNull();
  await expect(
    page.getByRole("heading", { name: "Project Showcase" })
  ).not.toBeNull();
  await expect(
    page.getByRole("heading", { name: "Technologies I Dabble With" })
  ).not.toBeNull();
  await expect(page.getByRole("heading", { name: "Who am I?" })).not.toBeNull();
  await expect(
    page.getByRole("heading", { name: "Books I'm Involved With" })
  ).not.toBeNull();
  await expect(
    page.getByRole("heading", { name: "The Work Which Inspired This Site" })
  ).not.toBeNull();
});

test("Correctly renders the work experience section", async ({ page }) => {
  await page.goto("/");

  await page.getByText("My Experience");
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
  await page.goto("/");
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
