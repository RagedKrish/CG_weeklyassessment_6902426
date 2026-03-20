class profile{
    current_password;
    new_password;
    confirm_new_password;
    savechanges;
    logout;
    accountDetail;
    firstname;
    lastname;
    constructor(page){
        this.firstname=page.locator('#account_first_name');
        this.lastname=page.locator('#account_last_name');
        this.current_password=page.locator('#password_current');
        this.new_password=page.locator('#password_1');
        this.confirm_new_password=page.locator('#password_2');
        this.savechanges=page.locator('[name="save_account_details"]');
        this.logout=page.locator('//a[@href="https://practice.automationtesting.in/my-account/customer-logout/"]').first();
        this.accountDetail=page.locator('//a[@href="https://practice.automationtesting.in/my-account/edit-account/"]').first();
    }
}

export default profile