import { test, expect } from '../../fixtures.js';
import { openPage } from '../../utils.js';

const emoji = ['😢', '😊'];
let rating = null;
let requestPayload = null;

const selector = {
  ratingComponent: '.rating.hover',
  ratingStar: '.rating.hover span[class*=star]',
  emoji: '.rating.hover span.emoji',
};

const partialUrl = '/L2NvbnRlbnQvcmF0aW5nQ29tcG9uZW50VGVzdENvbGxhdGVyYWwvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==';
const starsSelected = 'star hover selected';

test.describe('rating component validation', () => {
  const testURL = '/content/aem-boilerplate-forms-xwalk-collaterals/rating-component';

  test('rating custom component validation @chromium-only', async ({ page }) => {
    await openPage(page, testURL);
    await page.evaluate(async () => {
      // eslint-disable-next-line no-undef,no-underscore-dangle
      myForm._jsonModel.action = 'https://main--aem-boilerplate-forms--adobe-rnd.hlx.live/adobe/forms/af/submit/L2NvbnRlbnQvcmF0aW5nQ29tcG9uZW50VGVzdENvbGxhdGVyYWwvaW5kZXgvamNyOmNvbnRlbnQvcm9vdC9zZWN0aW9uXzAvZm9ybQ==';
    });

    // listeners to fetch payload form submission.
    page.on('request', async (request) => {
      if (request.url().includes(partialUrl)) {
        requestPayload = request.postData();
      }
    });

    const ratingLocator = page.locator(selector.ratingComponent);
    await expect(ratingLocator).toBeVisible();
    await ratingLocator.hover();
    const elements = await page.$$(selector.ratingStar);

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, element] of elements.entries()) {
      // eslint-disable-next-line no-await-in-loop
      await element.click();
      // eslint-disable-next-line no-await-in-loop
      const className = await element.getAttribute('class');
      // eslint-disable-next-line no-await-in-loop
      await expect(className).toBe(starsSelected);
      // eslint-disable-next-line no-await-in-loop
      const emojiValue = await page.locator(selector.emoji).textContent();
      // eslint-disable-next-line no-await-in-loop
      await expect(emojiValue).toBe(index < 3 ? emoji[0] : emoji[1]);
      rating = index + 1;
    }
    await page.getByRole('button', { name: 'Submit' }).click();
    expect(requestPayload.includes(rating)).toBeTruthy();
  });

  test('test enable disable', async ({page}) => {
    await openPage(page, testURL);

    // Test initial state (enabled)
    const ratingComponent = page.locator('.rating');
    await expect(ratingComponent).not.toHaveClass(/disabled/);

    // Click on the third star
    const stars = page.locator('.star');
    await stars.nth(2).click();

    // Verify the first three stars have the 'selected' class
    for (let i = 0; i < 3; i++) {
      await expect(stars.nth(i)).toHaveClass(/selected/);
    }

    // Verify the remaining stars don't have the 'selected' class
    const totalStars = await stars.count();
    for (let i = 3; i < totalStars; i++) {
      await expect(stars.nth(i)).not.toHaveClass(/selected/);
    }

    // Disable the rating component
    const disableBtn = await page.getByRole('button', { name: 'disable' });
    await disableBtn.click();

    // Verify the component has the 'disabled' class
    await expect(ratingComponent).toHaveClass(/disabled/);

    // Try to click on a different star (should not change the selection)
    await stars.nth(4).click();

    // Verify the selection hasn't changed (still only first three stars selected)
    for (let i = 0; i < 3; i++) {
      await expect(stars.nth(i)).toHaveClass(/selected/);
    }
    for (let i = 3; i < totalStars; i++) {
      await expect(stars.nth(i)).not.toHaveClass(/selected/);
    }

    // Re-enable the component
    const enableBtn = await page.getByRole('button', { name: 'enable' });
    await enableBtn.click();

    // Verify the component doesn't have the 'disabled' class
    await expect(ratingComponent).not.toHaveClass(/disabled/);

    // Click on a different star
    await stars.nth(4).click();

    // Verify the selection has changed
    for (let i = 0; i < 5; i++) {
      await expect(stars.nth(i)).toHaveClass(/selected/);
    }
    for (let i = 5; i < totalStars; i++) {
      await expect(stars.nth(i)).not.toHaveClass(/selected/);
    }
  });
});
