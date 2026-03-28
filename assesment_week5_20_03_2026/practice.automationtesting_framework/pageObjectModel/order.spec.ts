class order{
    orderbtn;
    ordernumbers;
    constructor(page){
        this.orderbtn=page.locator('//li[@class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders"]/a');
        this.ordernumbers=page.locator('//tr[@class="order"]/td[@class="order-number"]');
    }
}

export default order