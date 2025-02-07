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

  //calculateSubtotal 
  calculateSubtotal() {
    return Object.values(this.items).reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
  }


  //calculate Tax 
  calculateTax() {
    //as per the github example = tax Amount / subtotal = 1.88/15.05 = 0.125 = 12.5%
    return this.calculateSubtotal() * 0.125;
  }

  //calculate total
  calculateTotal() {
    return this.calculateSubtotal() + this.calculateTax();
  }


  displayCart() {
    console.log("Cart Summary: ");
    Object.entries(this.items).forEach(([product, details]) => {
      console.log(`${details.quantity} x ${product} @ ${details.price} each`);
    })

    console.log(`Subtotal: $${this.calculateSubtotal().toFixed(2)}`);
    console.log(`Tax(12.5%): $${this.calculateTax().toFixed(2)}`);
    console.log(`Total: $${this.calculateTotal().toFixed(2)}`);
  }

}

module.exports = ShoppingCart;