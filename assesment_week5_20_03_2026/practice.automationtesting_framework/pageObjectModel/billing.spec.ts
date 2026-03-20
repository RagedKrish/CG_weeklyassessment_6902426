class billing{
    firstname;
    lastname;
    email;
    phone;
    country;
    address;
    city;
    state;
    postcode;
    payment_type;
    placeorder;
    error;
    constructor(page){
        this.firstname=page.locator('#billing_first_name');
        this.lastname=page.locator('#billing_last_name');
        this.email=page.locator('#billing_email');
        this.phone=page.locator('#billing_phone');
        this.country=page.locator('//div[@id="s2id_billing_country"]/a');
        this.address=page.locator('//input[@id="billing_address_1"] |  //input[@id="billing_address_2"]');
        this.city=page.locator('//input[@id="billing_city"]');
        this.state=page.locator('#s2id_billing_state');
        this.postcode=page.locator('#billing_postcode');
        this.payment_type=page.locator('[name="payment_method"]');
        this.placeorder=page.locator('#place_order');
        this.error=page.locator('//ul[@class="woocommerce-error"]');
    };
    async country_select(page,cntry){
        this.country.click();
        await page.locator(`//div[@class="select2-result-label" and text()="${cntry}"]`).click();
    }
    async state_select(page,ste){
        this.state.click();
        await page.locator(`//div[@class="select2-result-label" and text()="${ste}"]`).click();
    }
}
export default billing