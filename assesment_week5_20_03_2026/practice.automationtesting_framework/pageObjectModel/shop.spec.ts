class shop{
    products;
    constructor(page){
        this.products=page.locator('//ul[@class="products masonry-done"]/li/a[text()="Add to basket"]');
    }
}

export default shop;