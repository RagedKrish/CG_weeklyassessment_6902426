import {test,expect} from "@playwright/test"
import path from "path"
import fs from "fs";
import homepage from "../pageObjectModel/home_page.spec";
import myaccount from "../pageObjectModel/myaccount.spec";
import profile from "../pageObjectModel/profile.spec";

let data2=JSON.parse(fs.readFileSync(path.join(__dirname,'../utility/e2e_scenario2.json')));


//login->accountdetail->create new password->logout->login with new password
test("e2e_scenario2",async({page})=>{
    let home=new homepage(page);
    let accountpage=new myaccount(page);
    let profilepage=new profile(page);
    
    await page.goto(data2.baseUrl);
    await expect(page).toHaveURL(/automationtesting/);
    await home.myaccount.click();
    await expect(page).toHaveURL(/my-account/);
    await accountpage.login_username.fill(data2.user.email);
    await accountpage.login_password.fill(data2.user.password);
    await accountpage.loginbtn.click();
    await expect(profilepage.logout).toBeVisible();
    await profilepage.accountDetail.click();
    await profilepage.firstname.fill(data2.user.firstName);
    await profilepage.lastname.fill(data2.user.lastName);
    await profilepage.current_password.fill(data2.user.password);
    await profilepage.new_password.type(data2.user.newpassword);
    await page.waitForTimeout(1000);
    await profilepage.confirm_new_password.type(data2.user.newpassword);
    await page.waitForTimeout(1000);
    await profilepage.savechanges.click();
    await profilepage.logout.click();
    await expect(page).toHaveURL(/my-account/);
    await accountpage.login_username.fill(data2.user.email);
    await accountpage.login_password.fill(data2.user.newpassword);
    await accountpage.loginbtn.click();
    await expect(profilepage.logout).toBeVisible();
    await page.screenshot({path:'screenshot/e2e_scenario2.png'});
})