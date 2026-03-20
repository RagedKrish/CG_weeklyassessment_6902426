import {test,expect} from "@playwright/test"
import path from "path"
import fs from "fs"
import homepage from "../pageObjectModel/home_page.spec"
import myaccount from "../pageObjectModel/myaccount.spec"

let data4=JSON.parse(fs.readFileSync(path.join(__dirname,"../utility/common_scenario1.json")))

//--> invalid credential test
test('common_scenario1',async({page})=>{
    let home=new homepage(page);
    let myaccountpage=new myaccount(page);
    
    await page.goto(data4.baseUrl);
    await home.myaccount.click();
    for(let user of data4.users){
        await myaccountpage.login_username.fill(user.email);
        await myaccountpage.login_password.fill(user.password);
        await myaccountpage.loginbtn.click();
        await expect(myaccountpage.error).toBeVisible();
    }
    await page.screenshot({path:"screenshot/common_scenario1.png"});
})