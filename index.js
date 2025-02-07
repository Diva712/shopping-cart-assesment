const ShoppingCart = require("./cart/ShoppingCart");

const execute = async () => {
  const shoppingCart = new ShoppingCart();
  await shoppingCart.addItem("cornflakes", 2);
  await shoppingCart.addItem("weetabix", 1);

  //displaying the cart
  shoppingCart.displayCart();
}
//execution of execute
execute().catch((error) => {
  console.error("Error during runnning shopping cart :", error)
});
