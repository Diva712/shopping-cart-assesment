require("dotenv").config();
const express = require("express");
const cartRoutes = require("./cart/routes/ShoppingRoutes");


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


//add middle for cartRoutes
app.use("/api/cart", cartRoutes);

//Use cart route
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});













// const ShoppingCart = require("./cart/ShoppingCart");

// const execute = async () => {
//   const shoppingCart = new ShoppingCart();
//   await shoppingCart.addItem("cornflakes", 2);
//   await shoppingCart.addItem("weetabix", 1);

//   //displaying the cart
//   shoppingCart.displayCart();
// }
// //execution of execute
// execute().catch((error) => {
//   console.error("Error during runnning shopping cart :", error)
// });
