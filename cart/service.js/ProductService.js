
const axios = require("axios");
//Price api base url 
const PRICE_API_URL = "http://localhost:3001/products";

const fetchProductPrice = async (productName) => {

  try {
    const fetchedProduct = await axios.get(`${PRICE_API_URL}/${productName}`);
    //return the price of fetched product;
    return fetchedProduct.data.price;
  } catch (error) {
    console.log(`Error during fetching the price for ${productName}`, error.message);
    return null;
  }
}

module.exports = { fetchProductPrice };