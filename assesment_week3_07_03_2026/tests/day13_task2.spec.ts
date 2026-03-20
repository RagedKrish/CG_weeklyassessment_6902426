import {test} from "@playwright/test"

test("tokyo_olympics",async({page})=>{
    await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020");
    await page.locator('//span/a[@href="/en/olympic-games/tokyo-2020/athletes"]').click();
    await page.mouse.wheel(0,2300);
    let silvermedal=await page.locator('//div[@data-medal-id="silver-medals-9"]/span').textContent();
    console.log("silvermedal",silvermedal);
    await page.screenshot({path:'screeshot/task2.png'});
})