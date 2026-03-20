import { test, expect } from "@playwright/test"
import path from "path"
import fs from "fs"

let data = fs.readFileSync(path.join(__dirname, "../data/data.json"));
let datafile = JSON.parse(data);

test("amazon_json", async ({ page }) => {
    await page.goto('https://www.amazon.in')
    for (let element of datafile.products) {
        await page.locator('#twotabsearchtextbox').fill(element);
        await page.locator('#nav-search-submit-button').click();
        await page.waitForLoadState('domcontentloaded');
        let title = await page.locator('//h2[@class="a-size-medium a-spacing-none a-color-base a-text-normal"]').first().textContent();
        console.log(`Title of first ${element}: ${title}`);
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.locator('//h2[@class="a-size-medium a-spacing-none a-color-base a-text-normal"]').first().click()
        ]);
        await newPage.waitForLoadState();

        const productTitle = await newPage.locator('#productTitle').first().textContent();
        console.log("Product Title:", productTitle);
        expect(productTitle).toBeTruthy();

        const price = await newPage.locator('//span[@class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay apex-pricetopay-value"]').first().textContent();
        console.log("Price:", price);
        expect(price).toBeTruthy();

        const rating = await newPage.locator('#acrPopover').first().textContent();
        console.log("Rating:", rating);
        expect(rating).toBeTruthy();
        await newPage.close();
    }
    await page.screenshot({path:'screenshot/task1.png'});
})