class address{
    addressbtn;
    editBillingAddress;
    editShippingAddress;
    savebtn;
    constructor(page){
        this.addressbtn=page.locator('//li[@class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-address"]/a');
        this.editBillingAddress=page.locator('//a[@href="https://practice.automationtesting.in/my-account/edit-address/billing"]');
        this.editShippingAddress=page.locator('//a[@href="https://practice.automationtesting.in/my-account/edit-address/shipping"]');
        this.savebtn=page.locator('[name="save_address"]');
    }
}

export default address