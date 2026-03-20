class homepage{
    shop;
    myaccount;
    checkout;
    constructor(page){
        this.shop=page.locator('(//a[@href="https://practice.automationtesting.in/shop/"])[1]');
        this.myaccount=page.locator('//a[@href="https://practice.automationtesting.in/my-account/"]');
        this.checkout=page.locator('//a[@href="https://practice.automationtesting.in/basket/"]').first();
    }
}

export default homepage