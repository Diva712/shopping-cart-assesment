const { fetchProductPrice } = require("./ProductService");

class ShoppingCart {

  constructor() {
    this.items = {};
  }


  async addItem(productName, quantity) {
    const price = await fetchProductPrice(productName);
    if (price == null) {
      console.log(`Product ${productName} is not found !!`)
      return;
    };



    if (this.items[productName]) {
      this.items[productName].quantity += quantity;
    }
    else {
      this.items[productName] = { quantity, price };
    }
    console.log(`${quantity} ${productName} added to the cart`);
  }




}