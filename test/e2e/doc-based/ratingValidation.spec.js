import { test, expect } from '../fixtures.js';
import { openPage } from '../utils.js';

const emoji = ['😢', '😊'];
let rating = null;
let requestPayload = null;

const selector = {
  ratingComponent: '.rating.hover',
  ratingStar: '.rating.hover span[class*=star]',
  emoji: '.rating.hover span.emoji',
};

const partialUrl = '/L3JhdGluZ3ZhbGlkYXRpb24uanNvbg==';
const starsSelected = 'star hover selected';

test.describe('rating component validation in Doc-based forms', () => {
  const testURL = '/ratingvalidation';

  test('rating custom component validation in Doc-based forms @chromium-only', async ({ page }) => {
    await openPage(page, testURL, 'docbased');

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

    for (const [index, element] of elements.entries()) {
      await element.click();
      const className = await element.getAttribute('class');
      await expect(className).toBe(starsSelected);
      const emojiValue = await page.locator(selector.emoji).textContent();
      await expect(emojiValue).toBe(index < 3 ? emoji[0] : emoji[1]);
      rating = index + 1;
    }
    await page.getByRole('button', { name: 'Submit' }).click();
    expect(requestPayload.includes(rating)).toBeTruthy();
  });
});
