import { expect, test } from '@playwright/test'

test('renders static marketing homepage sections', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Edit PDFs easily and quickly' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How PDF Editor works' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Work with PDFs' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Upload to convert' })).toBeVisible()
})
