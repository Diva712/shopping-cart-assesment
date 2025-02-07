const express = require("express");
const router = express.Router();
const cartController = require("../controller/ShoppingController");

//add item into cart
router.post("/add", cartController.addItemtoCart);
//get the summary of cart
router.get("/summary", cartController.getCartSummary);
//clear the cart.
router.delete("/clear", cartController.clearCart);

module.exports = router;