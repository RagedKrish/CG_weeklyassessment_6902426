import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/userBook.json"))
)

test("Register", async ({ page }) => {

for (const user of data.users) {

    await page.goto("https://demoqa.com/books")
    await page.locator("#login").click()
    await page.locator("#newUser").click()

    await page.locator("#firstname").fill(user.firstName)
    await page.locator("#lastname").fill(user.lastName)
    await page.locator("#userName").fill(user.username)
    await page.locator("#password").fill(user.password)
    page.once("dialog", async dialog => {
        await dialog.accept()
    });
    await page.locator("#register").click();
    await page.waitForTimeout(5000);
    await page.locator('#gotologin').click();
    await page.locator("#userName").fill(user.username)
    await page.locator("#password").fill(user.password)

    await page.locator("#login").click()
    await expect(page).toHaveURL(/profile/)
    await expect(page.locator("#userName-value")).toContainText(user.username)
    await page.locator("#gotoStore").click()
    await page.locator("#searchBox").fill(user.book)
    await page.locator(`text=${user.book}`).first().click()

    await page.locator("text=Add To Your Collection").click()
    await page.locator('//span[.="Profile"]').click();

    await expect(page.locator(`//*[text()="${user.book}"]`)).toBeVisible();
    await page.getByRole('button', { name: 'Logout' }).click()

    await expect(page).toHaveURL(/login/)
    await page.screenshot({path:'screenshot/task4.png'});

}

})