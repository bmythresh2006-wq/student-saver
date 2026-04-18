const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "Public")));

// ✅ Products API (8 items)
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Maggi", price: 12, image: "/images/maggi.jpg" },
    { id: 2, name: "Maggi 2 Pack", price: 24, image: "/images/maggi2.jpg" },
    { id: 3, name: "Lays", price: 20, image: "/images/lays.jpg" },
    { id: 4, name: "Kurkure", price: 15, image: "/images/kurkure.jpg" },
    { id: 5, name: "Bingo", price: 10, image: "/images/bingo.jpg" },
    { id: 6, name: "Choco Bar", price: 25, image: "/images/choco.jpg" },
    { id: 7, name: "Nissin Noodles", price: 30, image: "/images/nissin.jpg" },
    { id: 8, name: "K-Bomb Chips", price: 18, image: "/images/kbomb.jpg" }
  ]);
});

// Default route (important for frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// 🔥 IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});