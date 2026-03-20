class checkout{
    removeProduct;
    updatebasket;
    itemvalue;
    checkoutbtn
    constructor(page){
        this.removeProduct=page.locator('//a[@class="remove"]');
        this.itemvalue=page.locator('//div[@class="quantity"]/input');
        this.updatebasket=page.locator('[name="update_cart"]');
        this.checkoutbtn=page.locator('//a[@class="checkout-button button alt wc-forward"]');
    }
}

export default checkout;