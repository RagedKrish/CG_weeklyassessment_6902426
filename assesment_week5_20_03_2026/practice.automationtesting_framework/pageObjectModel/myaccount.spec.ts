class myaccount{
    login_username;
    login_password;
    register_email;
    register_password;
    loginbtn;
    registerbtn;
    error;
    constructor(page){
        this.login_username=page.locator('#username')
        this.login_password=page.locator('#password')
        this.loginbtn=page.locator('[name="login"]');
        this.register_email=page.locator('#reg_email');
        this.register_password=page.locator('#reg_password');
        this.registerbtn=page.locator('[name="register"]');
        this.error=page.locator('//ul[@class="woocommerce-error"]');
    }
}

export default myaccount;