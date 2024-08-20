import systemJsonEn from '@ajabhijeet21-internal/common-i18n/locales/en/system.json' assert { type: 'json' };
import systemJsonFr from '@ajabhijeet21-internal/common-i18n/locales/fr/system.json' assert { type: 'json' };
import { test, expect } from '@playwright/test';

const pageSlug = 'this-page-does-not-exist';

test.describe('404 not found page', () => {
  test('should have the title in english by default', async ({ page }) => {
    await page.goto(`/${pageSlug}`);
    const title = await page.title();
    expect(title).toBe(systemJsonEn.notFound.title);
  });
  test('should have the title in french', async ({ page }) => {
    await page.goto(`/fr/${pageSlug}`);
    const title = await page.title();
    expect(title).toBe(systemJsonFr.notFound.title);
  });
});
