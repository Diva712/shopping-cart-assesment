# Shopping Cart API

## Getting Started

### Clone the Repository
To run this Node.js application, first clone the repository using the following command:

```sh
git clone https://github.com/Diva712/shopping-cart-assesment.git
```

or manually copy the code from GitHub.

### Install Dependencies
Navigate to the project directory and install necessary packages:

```sh
npm install
```

### Run the Application
Start the server by running:

```sh
node index.js
```

Once the server is running, it will be available on **port 3000**.

## API Endpoints

### Add Items to Cart
**Endpoint:**
```sh
POST http://localhost:3000/api/cart/add
```

**Request Body:**
```json
{
  "items": [
    { "productName": "cornflakes", "quantity": 1 },
    { "productName": "cheerios", "quantity": 2 }
  ]
}
```

**Response:**
```json
{
    "message": "Items added successfully",
    "addedItems": [
        {
            "message": "1 x cornflakes added to the cart"
        },
        {
            "message": "2 x cheerios added to the cart"
        }
    ]
}
```

---

### Get Cart Summary
**Endpoint:**
```sh
GET http://localhost:3000/api/cart/summary
```

**Response:**
```json
{
    "items": {
        "cornflakes": {
            "quantity": 1,
            "price": 4.99
        },
        "cheerios": {
            "quantity": 2,
            "price": 8.43
        }
    },
    "subtotal": "21.85",
    "tax": "2.73",
    "total": "24.58"
}
```

---

### Clear Cart
**Endpoint:**
```sh
DELETE http://localhost:3000/api/cart/clear
```

**Response:**
```json
{
    "message": "Cart has been cleared !!"
}
```

## Internal Dependencies

This application fetches product prices using a **Price API**, available at:

```sh
http://localhost:3001/products/
```

## Singleton Pattern and Its Issues

Initially, the `ShoppingCart` class was implemented using the Singleton pattern. This means a single shared cart instance was used across all users. However, this approach causes inconsistency when multiple users modify the cart simultaneously.

### **Why Singleton Was a Problem?**
- **Not Suitable for Multi-User Applications** → All users share the same cart.
- **Difficult to Test in Isolation** → Single shared state makes unit testing harder.
- **Loss of Flexibility** → Cannot customize cart per user.

### **Solution: User-Specific Carts**
To handle multiple users correctly, we modified the implementation:
- Removed Singleton pattern and converted `ShoppingCart` into a regular class.
- Created a separate instance of `ShoppingCart` for each user.
- Stored user-specific carts in-memory using a **Map** (can be replaced with a database for persistence).

### **When to Use Singleton?**
- ✅ If the app is small and controlled by a single user/admin, Singleton can be used.
- ❌ If it's a multi-user e-commerce app, Singleton should be avoided.

Instead, each user should have their own `ShoppingCart` instance, stored in a **session or database**.

---

