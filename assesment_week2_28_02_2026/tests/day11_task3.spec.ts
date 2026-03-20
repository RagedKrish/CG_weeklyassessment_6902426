import {test} from "@playwright/test"

test("task3",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui/");
    await page.locator('//input[@id="name"]').first().fill("Krish");
    await page.locator('//input[@id="email"]').first().fill("krish18sharma21@gmail.com");
    await page.locator('//input[@id="password"]').first().fill("12345678");
    await page.locator('//button[text()="Register"]').click();
    await page.locator('//input[@id="email"]').first().fill("Krish");
    await page.locator('//input[@id="password"]').first().fill("12345678");
    await page.locator('//button[text()="Login"]').click();
    await page.screenshot({path:"screenshot/task3.png"});
    
    
});