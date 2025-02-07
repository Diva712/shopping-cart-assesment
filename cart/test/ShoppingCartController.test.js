const request = require("supertest");
const express = require("express");
const cartController = require("../controller/ShoppingController");
const ShoppingCart = require("../model/ShoppingCart");

//Mock shoppingcart class
jest.mock("../model/ShoppingCart.js");


const app = express();
app.use(express.json());
app.post("/cart", cartController.addItemtoCart);
app.get("/cart", cartController.getCartSummary);
app.delete("/cart", cartController.clearCart);


describe("Cart API Endpoint", () => {
  let cartMock;

  beforeEach(() => {
    ShoppingCart.addItem = jest.fn();
    ShoppingCart.getCartSummary = jest.fn();
    ShoppingCart.clearCart = jest.fn();
  });

  //Test - 8 (test for empty issue)
  test("should reutrn 400 for empty items arrays", async () => {
    const response = await request(app).post("/cart").send({ items: [] });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid items array" })
  })

  //Test - 9 (Test case for adding mulitple items to cart)
  test("should add mulitple items to cart", async () => {
    ShoppingCart.addItem.mockResolvedValueOnce({ message: "1 x cornflakes added to the cart" });
    ShoppingCart.addItem.mockResolvedValueOnce({ message: "2 x weetabix added to the cart" });


    const response = await request(app).post("/cart").send({
      items: [
        { productName: "cornflakes", quantity: 1 },
        { productName: "weetabix", quantity: 2 },
      ]
    })


    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Items added successfully",
      addedItems: [
        { message: "1 x cornflakes added to the cart" },
        { message: "2 x weetabix added to the cart" },
      ],
    });
  });

  // TEST- 10 (Test for summary)
  test("should return cart summary", async () => {
    ShoppingCart.getCartSummary.mockReturnValue({
      items: { cornflakes: { quantity: 1, price: 100 } },
      subtotal: "100.00",
      tax: "12.50",
      total: "112.50",
    });

    const response = await request(app).get("/cart");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      items: { cornflakes: { quantity: 1, price: 100 } },
      subtotal: "100.00",
      tax: "12.50",
      total: "112.50",
    });
  });

  // Test - 10 (Test for clear cart)
  test("should clear the cart", async () => {
    ShoppingCart.clearCart.mockReturnValue({ message: "Cart has been cleared !!" });

    const response = await request(app).delete("/cart");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Cart has been cleared !!" });
  });

});