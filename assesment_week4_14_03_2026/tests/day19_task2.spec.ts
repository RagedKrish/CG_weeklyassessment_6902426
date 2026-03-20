import { test, expect } from "@playwright/test"
import path from "path"
import fs from "fs"

let student = fs.readFileSync(path.join(__dirname, "../data/student.json"));
let studentfile = JSON.parse(student);



test('Student_form', async ({ page }) => {


    for (let student of studentfile.students) {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.getByPlaceholder('First Name').fill(student.firstName);
        await page.getByPlaceholder('Last Name').fill(student.lastName);
        await page.getByPlaceholder('name@example.com').fill(student.email);
        await page.getByText(student.gender, { exact: true }).click();
        await page.getByPlaceholder('Mobile Number').fill(student.mobile);

        await page.locator('#dateOfBirthInput').click();
        await page.keyboard.press('Control+A');
        await page.keyboard.type(student.dob);
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        await page.locator('#subjectsInput').fill(student.subjects);
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        for (const hobby of student.hobbies) {
            await page.getByText(hobby, { exact: true }).click();
        }
        await page.locator('#uploadPicture').setInputFiles(student.picture);
        await page.getByPlaceholder('Current Address').fill(student.address);
        await page.locator('//div[@class="css-19bb58m"]').first().click();
        await page.keyboard.type(student.state)
        await page.keyboard.press('Enter');
        await page.locator('//div[@class="css-19bb58m"]').last().click();
        await page.keyboard.type(student.city)
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        await expect(page.locator('//div[@class="modal-content"]')).toBeVisible();
        const name = await page.locator('//td[text()="Student Name"]/following-sibling::td').textContent();
        expect(name).toBe(`${student.firstName} ${student.lastName}`);

        const email = await page.locator('//td[text()="Student Email"]/following-sibling::td').textContent();
        expect(email).toBe(student.email);

        const gender = await page.locator('//td[text()="Gender"]/following-sibling::td').textContent();
        expect(gender).toBe(student.gender);

        const mobile = await page.locator('//td[text()="Mobile"]/following-sibling::td').textContent();
        expect(mobile).toBe(student.mobile);

        const address = await page.locator('//td[text()="Address"]/following-sibling::td').textContent();
        expect(address).toBe(student.address);

        const stateCity = await page.locator('//td[text()="State and City"]/following-sibling::td').textContent();
        expect(stateCity).toBe(`${student.state} ${student.city}`);

        await page.locator('#closeLargeModal').click();
    }
    await page.screenshot({ path: 'screenshot/task2.png' })
})