const cart = require("../model/ShoppingCart");

exports.addItemtoCart = async (req, res) => {

  try {
    //Handling If user add multiple items into the cart
    const { items } = req.body;

    // console.log("Request Body: ", req.body);

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Invalid items array"
      })
    }

    let addedItems = [];
    for (const item of items) {
      const { productName, quantity } = item;

      if (!productName || !quantity || quantity <= 0) {
        return res.status(400).json({
          error: `Invalid product name or quantity for items: ${JSON.stringify(item)}`,
        });
      }

      const result = await cart.addItem(productName, quantity);
      addedItems.push(result);
    }

    res.status(200).json({
      message: "Items added successfully", addedItems
    })


  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
  // try {
  //   const { productName, quantity } = req.body;
  //   console.log("request body", req.body);
  //   if (!productName || !quantity || quantity <= 0) {
  //     return res.status(400).json(
  //       {
  //         error: "Invalid product name or quantity"
  //       }
  //     )
  //   };

  //   const result = await cart.addItem(productName, quantity);
  //   res.status(200).json(result);
  // } catch (error) {

  //   res.status(500).json({
  //     error: error.message
  //   })

  // }
};


exports.getCartSummary = (req, res) => {
  res.status(200).json(cart.getCartSummary());
};

exports.clearCart = (req, res) => {
  res.status(200).json(cart.clearCart());
}