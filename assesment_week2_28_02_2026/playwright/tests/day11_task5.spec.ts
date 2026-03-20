import {test} from "@playwright/test"

test("task1",async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator('//input[@id="twotabsearchtextbox"]').fill("Shoes");
    await page.keyboard.press("Enter");
    await page.locator('(//i[@class="a-icon a-icon-checkbox"])[1]').click();
    console.log(await page.locator('(//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal"]/span)[4]').textContent());
    console.log(await page.locator('(//span[@class="a-offscreen"])[10]').textContent());
    await page.screenshot({path:"screenshot/task5.png"})
    
    
});