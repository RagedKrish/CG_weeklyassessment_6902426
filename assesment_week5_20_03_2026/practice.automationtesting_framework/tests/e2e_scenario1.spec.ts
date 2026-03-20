import { test, expect } from "@playwright/test";
import homepage from "../pageObjectModel/home_page.spec";
import myaccount from "../pageObjectModel/myaccount.spec";
import shop from "../pageObjectModel/shop.spec";
import checkout from "../pageObjectModel/checkout.spec";
import billing from "../pageObjectModel/billing.spec";

import path from "path";
import fs from "fs";

let data1 = JSON.parse(fs.readFileSync(path.join(__dirname, '../utility/e2e_scenario1.json')))

//register->Add Product->Go to cart->Checkout
test('e2e_scenario1', async ({ page }) => {
    let home=new homepage(page);
    let accountpage=new myaccount(page);
    let shoppage=new shop(page);
    let checkoutpage=new checkout(page);
    let billingpage=new billing(page);
    
    await page.goto(data1.baseUrl);
    await home.myaccount.click();
    const safeDate = new Date().toISOString().replace(/[:.]/g, '-');
    const email = `${safeDate}_testuser12345@gmail.com`;
    await accountpage.register_email.fill(email);
    await accountpage.register_password.fill(data1.user.password);
    await page.waitForTimeout(3000);
    await accountpage.registerbtn.click();
    await accountpage.registerbtn.click();
    await home.shop.click();
    await expect(shoppage.products.first()).toBeVisible();
    await shoppage.products.first().click();
    await home.checkout.click();
    await expect(checkoutpage.checkoutbtn).toBeVisible();
    await checkoutpage.checkoutbtn.click();
    await expect(billingpage.firstname).toBeVisible(); 
    await billingpage.firstname.fill(data1.checkout.firstName);
    await billingpage.lastname.fill(data1.checkout.lastName);
    await billingpage.email.fill(data1.checkout.email);
    await billingpage.phone.fill(data1.checkout.phone);
    await billingpage.country_select(page,data1.checkout.country);
    await billingpage.state_select(page,data1.checkout.state);
    await billingpage.city.fill(data1.checkout.city);
    await billingpage.address.first().fill(data1.checkout.address1);
    await billingpage.address.last().fill(data1.checkout.address2);
    await billingpage.postcode.fill(data1.checkout.pincode)
    await billingpage.payment_type.first().click();
    await expect(billingpage.placeorder).toBeVisible(); 
    await billingpage.placeorder.click();
    await page.waitForSelector('//p[@class="woocommerce-thankyou-order-received"]');
    await expect(page.url()).toContain('/order-received/');
    await page.screenshot({path:'screenshot/e2e_scenario1.png'})
})