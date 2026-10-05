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
  // The board opens as a growing circular clip, which also clips pointer
  // hit-testing. Wait for the reveal so presses reach the whole felt.
  await expect
    .poll(() =>
      felt.evaluate((el) => {
        const clip = getComputedStyle(el.parentElement!).clipPath;
        return parseFloat(clip.match(/circle\(([\d.]+)px/)?.[1] ?? "0");
      }),
    )
    .toBeGreaterThan(500);
  return felt;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Pool hero", () => {
  test("Shows only the coin while closed", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Open pool game" }),
    ).toBeVisible();
    await expect(page.getByText("Click me to play")).toHaveCount(0);
    await expect(page.getByTestId("pool-felt")).toHaveCount(0);
  });

  test("Opens the table when the coin is clicked", async ({ page }) => {
    await openTable(page);

    await expect(page.getByText("James", { exact: true })).toBeVisible();
    await expect(page.getByText("You", { exact: true })).toBeVisible();
  });

  test("End game collapses to the coin and reopening starts a new game", async ({
    page,
  }) => {
    await openTable(page);

    await page.getByRole("button", { name: "End game" }).click();

    // The faded-out board is inert (opacity 0 still counts as visible).
    await expect(page.locator("[inert] [data-testid=\"pool-felt\"]")).toHaveCount(
      1,
    );
    const coin = page.getByRole("button", { name: "Open pool game" });
    await expect(coin).toBeVisible();

    await coin.click();
    await expect(page.getByText(/Your break/)).toBeVisible();
    await expect(page.getByTestId("pool-felt")).toBeVisible();
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
  test("Starts with ball in hand behind the head string", async ({ page }) => {
    const felt = await openTable(page);

    await expect(
      page.getByText(
        "Your break. Drag the white to place it behind the line, then aim and drag to shoot.",
      ),
    ).toBeVisible();
    // Keyboard players are told how to move the white.
    await expect(felt).toHaveAttribute("aria-label", /W A S D/);
  });

  test("Missing every ball gives James ball in hand", async ({ page }) => {
    test.setTimeout(60_000);
    const felt = await openTable(page);
    const box = await felt.boundingBox();
    const viewport = page.viewportSize();
    if (!box || !viewport) throw new Error("Missing felt box or viewport");
    const portrait = viewport.width < MOBILE_BREAKPOINT;

    // The white starts a quarter of the way along the long side, centred, and
    // the rack is further along it. Aim the other way, towards the head
    // cushion, with a soft stroke so it never reaches the rack.
    const white = portrait
      ? { x: box.x + box.width / 2, y: box.y + box.height * 0.25 }
      : { x: box.x + box.width * 0.25, y: box.y + box.height / 2 };
    const aimAt = portrait
      ? { x: white.x, y: white.y - 70 }
      : { x: white.x - 70, y: white.y };
    await page.mouse.move(aimAt.x, aimAt.y);
    await page.mouse.down();
    // Drag sideways to set a gentle power without changing the locked aim.
    await page.mouse.move(aimAt.x + 15, aimAt.y + 15, { steps: 5 });
    await page.mouse.move(aimAt.x + 40, aimAt.y + 40, { steps: 5 });
    await page.mouse.up();

    await expect(
      page.getByText("Foul: no ball hit. James has ball in hand."),
    ).toBeVisible({ timeout: 20_000 });

    // James slides the white into place, lines up and shoots, then the turn
    // moves on and the message changes.
    await expect(
      page.getByText("Foul: no ball hit. James has ball in hand."),
    ).toBeHidden({ timeout: 30_000 });
  });
});
