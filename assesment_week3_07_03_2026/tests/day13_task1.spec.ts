import {test} from "@playwright/test"

test("icc ranks",async ({page})=>{
    await page.goto('https://www.icc-cricket.com/rankings')
    await page.locator('//a[@href="/rankings/batting/womens/odi"]').click();
    await page.mouse.wheel(0,300);
    let ranking=await page.locator('(//span[@class=" text-xs pr-4 font-extrabold uppercase text-primary "])[2]').textContent();
    console.log("Beth Mooney rank : ",ranking);
    await page.screenshot({path:"screeshot/task1.png"});
})