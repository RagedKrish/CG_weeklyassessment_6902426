class ordersuccesfull{
    ordernumber;
    constructor(page){
        this.ordernumber=page.locator('//li[@class="order"]/strong');
    }
}

export default ordersuccesfull