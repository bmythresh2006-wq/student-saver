const express = require("express");
const path = require("path");

const app = express();

// allow JSON data
app.use(express.json());

// show frontend files
app.use(express.static(path.join(__dirname, "Public")));

// load products
let products = require("./products");

// show products to website
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ADMIN: add product
app.post("/api/add-product", (req, res) => {
  const newProduct = req.body;

  newProduct.id = products.length + 1;

  products.push(newProduct);

  res.send("Product added");
});

// start server
app.listen(3000, () => {
  console.log("Server running");
});