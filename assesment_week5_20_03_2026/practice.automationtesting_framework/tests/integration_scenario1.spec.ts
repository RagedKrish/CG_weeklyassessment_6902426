import {test,expect} from "@playwright/test"
import path from "path"
import fs from "fs"
import homepage from "../pageObjectModel/home_page.spec"
import shop from "../pageObjectModel/shop.spec"
import checkout from "../pageObjectModel/checkout.spec"
import billing from "../pageObjectModel/billing.spec"

let data3=JSON.parse(fs.readFileSync(path.join(__dirname,"../utility/integration_scenario1.json")));


//add product to cart -> go to cart -> update amount of items -> remove items -> update cart -> checkout
test('integration_Scenario1',async({page})=>{
    let home=new homepage(page);
    let shoppage=new shop(page);
    let checkoutpage=new checkout(page);
    let billingpage=new billing(page);
    
    await page.goto(data3.baseUrl);
    await home.shop.click();
    await expect(shoppage.products.first()).toBeVisible();
    await shoppage.products.nth(2).click();
    await page.waitForTimeout(500);
    await shoppage.products.first().click();
    await page.waitForTimeout(500);
    await shoppage.products.last().click();
    await home.checkout.click();
    await expect(checkoutpage.checkoutbtn).toBeVisible();
    await checkoutpage.itemvalue.nth(0).fill('2');
    await expect(checkoutpage.itemvalue.nth(0)).toHaveValue('2');
    await checkoutpage.itemvalue.nth(1).fill('3');
    await expect(checkoutpage.itemvalue.nth(1)).toHaveValue('3');
    await checkoutpage.itemvalue.last().fill('4');
    await expect(checkoutpage.itemvalue.nth(2)).toHaveValue('4');
    await checkoutpage.updatebasket.click();
    await checkoutpage.removeProduct.first().click();
    await expect(checkoutpage.removeProduct).toHaveCount(2);
    await checkoutpage.checkoutbtn.click();
    await expect(billingpage.firstname).toBeVisible(); 
    await billingpage.firstname.fill(data3.checkout.firstName);
    await billingpage.lastname.fill(data3.checkout.lastName);
    await billingpage.email.fill(data3.checkout.email);
    await billingpage.phone.fill(data3.checkout.phone);
    await billingpage.country_select(page,data3.checkout.country);
    await billingpage.state_select(page,data3.checkout.state);
    await billingpage.city.fill(data3.checkout.city);
    await billingpage.address.first().fill(data3.checkout.address1);
    await billingpage.address.last().fill(data3.checkout.address2);
    await billingpage.postcode.fill(data3.checkout.pincode)
    await billingpage.payment_type.first().click();
    await expect(billingpage.placeorder).toBeVisible(); 
    await billingpage.placeorder.click();
    await page.waitForSelector('//p[@class="woocommerce-thankyou-order-received"]');
    await expect(page.url()).toContain('/order-received/');
    await page.screenshot({path:'screenshot/integration_scenario1.png'})
})