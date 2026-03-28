import { test, expect } from "@playwright/test"
import path from "path"
import fs from "fs"
import homepage from "../pageObjectModel/home_page.spec"
import myaccount from "../pageObjectModel/myaccount.spec"
import address from "../pageObjectModel/address.spec"
import billing from "../pageObjectModel/billing.spec"
import shop from "../pageObjectModel/shop.spec"
import checkout from "../pageObjectModel/checkout.spec"
import ordersuccesfull from "../pageObjectModel/ordersuccesfull.spec"
import order from "../pageObjectModel/order.spec"

let data6 = JSON.parse(fs.readFileSync(path.join(__dirname, "../utility/e2e_scenario3.json")));

test('e2e_scenario3', async ({ page }) => {
    let home = new homepage(page);
    let myaccountpage = new myaccount(page);
    let addresspage = new address(page);
    let billingpage = new billing(page);
    let shoppage = new shop(page);
    let checkoutpage = new checkout(page);
    let ordersuccesfullpage=new ordersuccesfull(page);
    let orderpage=new order(page);
    await page.goto(data6.baseUrl);
    await home.myaccount.click();
    await myaccountpage.login_username.fill(data6.user.email);
    await myaccountpage.login_password.fill(data6.user.password);
    await myaccountpage.loginbtn.click();
    await page.waitForTimeout(1000);
    await addresspage.addressbtn.click();
    await addresspage.editBillingAddress.click();
    await billingpage.firstname.fill(data6.billingDetails.firstName);
    await billingpage.lastname.fill(data6.billingDetails.lastName);
    await billingpage.email.fill(data6.billingDetails.email);
    await billingpage.phone.fill(data6.billingDetails.phone);
    await billingpage.country_select(page, data6.billingDetails.country);
    await billingpage.state_select(page, data6.billingDetails.state);
    await billingpage.city.fill(data6.billingDetails.city);
    await billingpage.address.first().fill(data6.billingDetails.address1);
    await billingpage.address.last().fill(data6.billingDetails.address2);
    await billingpage.postcode.fill(data6.billingDetails.postcode);
    await addresspage.savebtn.click();
    await home.shop.click();
    await shoppage.products.nth(3).click();
    await home.checkout.click();
    await checkoutpage.checkoutbtn.click();
    await expect(billingpage.firstname).toHaveValue(data6.billingDetails.firstName);
    await expect(billingpage.firstname).toHaveValue(data6.billingDetails.firstName);
    await expect(billingpage.lastname).toHaveValue(data6.billingDetails.lastName);
    await expect(billingpage.email).toHaveValue(data6.billingDetails.email);
    await expect(billingpage.phone).toHaveValue(data6.billingDetails.phone);
    await expect(billingpage.address.first()).toHaveValue(data6.billingDetails.address1);
    await expect(billingpage.address.last()).toHaveValue(data6.billingDetails.address2);
    await expect(billingpage.city).toHaveValue(data6.billingDetails.city);
    await expect(billingpage.postcode).toHaveValue(data6.billingDetails.postcode);
    await billingpage.placeorder.click();
    let ordernum=await ordersuccesfullpage.ordernumber.textContent();
    await home.myaccount.click();
    await page.waitForTimeout(1000);
    await orderpage.orderbtn.click();
    await expect(orderpage.ordernumbers.first()).toHaveText("#"+ordernum);
})