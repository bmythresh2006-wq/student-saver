const express = require("express");
const products = require("./products");

const app = express();

app.use(express.json());
app.use(express.static("public"));

let orders = []; // store orders temporarily

app.get("/api/products", (req, res) => {
  res.json(products);
});

// Save order with proof
app.post("/api/order", (req, res) => {
  const order = req.body;

  order.status = "Pending Verification";
  order.id = Date.now();

  orders.push(order);

  console.log("New Order:", order);

  res.json({
    message: "Order received! Waiting for payment verification."
  });
});

// Admin view orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});