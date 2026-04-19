const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "Public")));

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Maggi Masala Cup Noodles",
      price: 48,
      originalPrice: 52,
      image: "/images/maggi1.jpg",
      category: "Instant Food"
    },
    {
      id: 2,
      name: "Maggi Chilly Chow Cup",
      price: 48,
      originalPrice: 52,
      image: "/images/maggi2.jpg",
      category: "Instant Food"
    },
    {
      id: 3,
      name: "Nissin Mazedaar Masala",
      price: 35,
      originalPrice: 38,
      image: "/images/nissin.jpg",
      category: "Instant Food"
    },
    {
      id: 4,
      name: "K-Bomb Hot & Spicy",
      price: 30,
      originalPrice: 45,
      image: "/images/kbomb.jpg",
      category: "Snacks"
    },
    {
      id: 5,
      name: "Bingo Chips",
      price: 35,
      originalPrice: 50,
      image: "/images/bingo.jpg",
      category: "Snacks"
    },
    {
      id: 6,
      name: "Lays Chips",
      price: 39,
      originalPrice: 48,
      image: "/images/lays.jpg",
      category: "Snacks"
    },
    {
      id: 7,
      name: "Kurkure Puffcorn",
      price: 18,
      originalPrice: 20,
      image: "/images/kurkure.jpg",
      category: "Snacks"
    },
    {
      id: 8,
      name: "Lotte Choco Pie",
      price: 164,
      originalPrice: 205,
      image: "/images/choco.jpg",
      category: "Snacks"
    }
  ]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running");
});