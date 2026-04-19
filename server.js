const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// ✅ Serve frontend (VERY IMPORTANT)
app.use(express.static(path.join(__dirname, "Public")));

// In-memory products (temporary DB)
let products = [];

// ✅ GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ ADD product
app.post("/api/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  products.push(newProduct);
  res.json({ success: true, product: newProduct });
});

// ✅ UPDATE product
app.put("/api/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const updated = req.body;

  products = products.map(p =>
    p.id === id ? { ...p, ...updated } : p
  );

  res.json({ success: true });
});

// ✅ DELETE product
app.delete("/api/product/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.filter(p => p.id !== id);

  res.json({ success: true });
});

// ✅ Fallback (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});