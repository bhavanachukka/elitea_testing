import { test, expect } from '@playwright/test';

/**
 * EPAM Website Navigation Test Scenario
 * 
 * This test automates the following steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Website Navigation Test Suite', () => {
  
  test('Should navigate through EPAM website and verify Client Work page', async ({ page }) => {
    
    // Step 1: Navigate to EPAM homepage
    console.log('Step 1: Navigating to https://www.epam.com/');
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });
    
    // Verify homepage has loaded
    await expect(page).toHaveTitle(/EPAM/);
    console.log('✓ EPAM homepage loaded successfully');
    
    // Step 2: Navigate to Services page (selecting "Services" from header menu)
    console.log('Step 2: Navigating to Services page');
    await page.goto('https://www.epam.com/services', { waitUntil: 'networkidle' });
    
    // Verify Services page has loaded
    await expect(page).toHaveTitle('Services | EPAM');
    console.log('✓ Services page loaded successfully');
    
    // Step 3: Click the "Explore Our Client Work" link
    console.log('Step 3: Clicking "Explore Our Client Work" link');
    const exploreClientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
    await expect(exploreClientWorkLink).toBeVisible();
    await exploreClientWorkLink.click();
    
    // Wait for navigation to complete
    await page.waitForURL('**/services/client-work', { waitUntil: 'networkidle' });
    console.log('✓ Navigated to Client Work page');
    
    // Step 4: Verify that the "Client Work" text is visible on the page
    console.log('Step 4: Verifying "Client Work" text is visible');
    const clientWorkHeading = page.getByRole('heading', { name: /Client Work/i });
    await expect(clientWorkHeading).toBeVisible();
    console.log('✓ "Client Work" heading is visible');
    
    // Additional verifications
    await expect(page).toHaveTitle('Client Work');
    console.log('✓ Page title is "Client Work"');
    
    // Verify that we can see case study content on the page
    const caseStudyText = page.getByText(/Case Study/i);
    await expect(caseStudyText).toBeVisible();
    console.log('✓ Case study content is visible on the page');
    
    console.log('✓ All test steps completed successfully');
  });

  test('Should verify Client Work page content and structure', async ({ page }) => {
    
    // Navigate directly to Client Work page
    await page.goto('https://www.epam.com/services/client-work', { waitUntil: 'networkidle' });
    
    // Verify page title
    await expect(page).toHaveTitle('Client Work');
    
    // Verify main heading
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    
    // Verify Forbes Global 2000 reference
    const forbesReference = page.getByText(/Forbes Global 2000/i);
    await expect(forbesReference).toBeVisible();
    
    // Verify that case studies section exists
    const caseStudies = page.getByText(/CASE STUDY/i).first();
    await expect(caseStudies).toBeVisible();
    
    console.log('✓ Client Work page verification passed');
  });

});
