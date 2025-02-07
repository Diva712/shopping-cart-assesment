const cart = require("../model/ShoppingCart");

exports.addItemtoCart = async (req, res) => {
  try {
    const { productName, quantity } = req.body;
    console.log("request body", req.body);
    if (!productName || !quantity || quantity <= 0) {
      return res.status(400).json(
        {
          error: "Invalid product name or quantity"
        }
      )
    };

    const result = await cart.addItem(productName, quantity);
    res.status(200).json(result);
  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
};


exports.getCartSummary = (req, res) => {
  res.status(200).json(cart.getCartSummary());
};

exports.clearCart = (req, res) => {
  res.status(200).json(cart.clearCart());
}