import { test, expect, type Page } from "@playwright/test";

// The game is randomised (rack orientation) and James takes about 5s per turn,
// so these tests cover wiring and behaviour, not shot outcomes. Rules and
// physics are covered deterministically by the engine unit tests.

const MOBILE_BREAKPOINT = 768;

async function openTable(page: Page) {
  await page.getByRole("button", { name: "Open pool game" }).click();
  await expect(page.getByText(/Your break/)).toBeVisible();
  const felt = page.getByTestId("pool-felt");
  await expect(felt).toBeVisible();
  return felt;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Pool hero", () => {
  test("Shows the coin and a play hint while closed", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Open pool game" }),
    ).toBeVisible();
    await expect(page.getByText("Click me to play")).toBeVisible();
    await expect(page.getByTestId("pool-felt")).toHaveCount(0);
  });

  test("Opens the table when the coin is clicked", async ({ page }) => {
    await openTable(page);

    await expect(page.getByText("Click me to play")).toBeHidden();
    await expect(page.getByText("James", { exact: true })).toBeVisible();
    await expect(page.getByText("You", { exact: true })).toBeVisible();
  });

  test("Lays the table out for the viewport size", async ({ page }) => {
    const felt = await openTable(page);
    const box = await felt.boundingBox();
    const viewport = page.viewportSize();
    if (!box || !viewport) throw new Error("Missing felt box or viewport");

    if (viewport.width < MOBILE_BREAKPOINT) {
      expect(box.height).toBeGreaterThan(box.width);
    } else {
      expect(box.width).toBeGreaterThan(box.height);
    }
  });

  test("Cannot be closed once open", async ({ page }) => {
    const felt = await openTable(page);

    await test.step("Clicking the photo on the felt does nothing", async () => {
      await felt.click();
    });

    await expect(felt).toBeVisible();
    await expect(page.getByText(/Your break/)).toBeVisible();

    await test.step("The coin is inert so it cannot be clicked or focused", async () => {
      await expect(
        page.locator("[inert] button[aria-label=\"Open pool game\"]"),
      ).toHaveCount(1);
    });
  });

  test("Takes a shot and passes the turn on", async ({ page }) => {
    const felt = await openTable(page);
    const box = await felt.boundingBox();
    if (!box) throw new Error("Missing felt box");

    // Press at the centre to lock the aim, then drag away to set power.
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 30, y + 30, { steps: 5 });
    await page.mouse.move(x + 60, y + 60, { steps: 5 });
    await page.mouse.up();

    // Once the balls stop, the break prompt is replaced by the result.
    await expect(page.getByText(/Your break/)).toBeHidden({ timeout: 20_000 });
  });
});
