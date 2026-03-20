import {test,expect} from "@playwright/test"
import path from "path"
import fs from "fs"
import homepage from "../pageObjectModel/home_page.spec"
import shop from "../pageObjectModel/shop.spec"
import checkout from "../pageObjectModel/checkout.spec"
import billing from "../pageObjectModel/billing.spec"

let data5=JSON.parse(fs.readFileSync(path.join(__dirname,"../utility/common_scenario2.json")));

//Required Field Validation at billing
test('common_scenario2',async({page})=>{
    let home=new homepage(page);
    let shopage=new shop(page);
    let checkoutpage=new checkout(page);
    let billingpage=new billing(page);
    
    await page.goto(data5.baseUrl);
    await home.shop.click();
    await shopage.products.nth(4).click();
    await home.checkout.click();
    await checkoutpage.checkoutbtn.click();
    await billingpage.placeorder.click();
    await expect(billingpage.error).toBeVisible();
    await page.waitForTimeout(1000);
    await page.screenshot({path:"screenshot/common_scenario2.png"})
})