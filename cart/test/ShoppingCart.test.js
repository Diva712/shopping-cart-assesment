const cart = require("../model/ShoppingCart");
const { fetchProductPrice } = require("../service/ProductService");

//Mock fetchProductPrice to return test prices
jest.mock("../service/ProductService.js", () => ({
  fetchProductPrice: jest.fn(),
}));

describe("ShoppingCart Class", () => {
  beforeEach(() => {
    cart.clearCart();
  });

  //Test - 1 (for add a product to the cart)
  test("should add a product to the cart", async () => {
    fetchProductPrice.mockResolvedValue(100); // For moking the price of product;

    const result = await cart.addItem("cornflakes", 1);
    expect(result).toEqual({ message: "1 x cornflakes added to the cart" });
    expect(cart.items["cornflakes"]).toEqual({ quantity: 1, price: 100 });
  });

  //Test - 2 (for check error scenerio)
  test("should throw an error if the item is not found", async () => {
    fetchProductPrice.mockResolvedValue(null); // Mock product not found

    await expect(cart.addItem("NonExistentItem", 1)).rejects.toThrow(
      "Product NonExistentItem is not found"
    );
  });

  //Test - 3 (for checking the quantity during adding item into the cart)
  test("should increase quantity when adding the same item", async () => {
    fetchProductPrice.mockResolvedValue(50);

    await cart.addItem("cornflakes", 1);
    await cart.addItem("cornflakes", 2);

    expect(cart.items["cornflakes"].quantity).toBe(3);
  });


  //Test - 4 (checking the test for subtotal)
  test("should calculate subtotal correctly", async () => {
    fetchProductPrice.mockResolvedValueOnce(100);
    fetchProductPrice.mockResolvedValueOnce(50);

    await cart.addItem("cornflakes", 1);
    await cart.addItem("weetabix", 2);

    expect(cart.calculateSubtotal()).toBe(200);
  });

  //Test - 5 (checking the test case for tax calculation)
  test("should calculate tax correctly", async () => {
    fetchProductPrice.mockResolvedValue(100);
    await cart.addItem("cornflakes", 1);
    expect(cart.calculateTax()).toBe(12.5); //12.5 percent
  });

  //Test - 6 (check the clear cart test)
  test("should clear the cart", () => {
    cart.items = { cornflakes: { quantity: 1, price: 100 } };
    cart.clearCart();
    expect(cart.items).toEqual({});
  });


  //Test - 7(Test for check correct cart summary )
  test("should return correct cart summary", async () => {
    fetchProductPrice.mockResolvedValue(100);

    await cart.addItem("cornflakes", 1);
    const summary = cart.getCartSummary();
    expect(summary).toEqual({
      items: {
        cornflakes: {
          quantity: 1,
          price: 100
        }
      },

      subtotal: "100.00",
      tax: "12.50",
      "total": "112.50",
    });
  });
});