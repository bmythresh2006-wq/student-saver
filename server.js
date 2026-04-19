app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Maggi Masala Cup Noodles (70g)",
      price: 48,
      originalPrice: 52,
      image: "/images/maggi1.jpg",
      category: "Instant Food"
    },
    {
      id: 2,
      name: "Maggi Chilly Chow Cup Noodles (70g)",
      price: 48,
      originalPrice: 52,
      image: "/images/maggi2.jpg",
      category: "Instant Food"
    },
    {
      id: 3,
      name: "Nissin Mazedaar Masala (45g)",
      price: 35,
      originalPrice: 38,
      image: "/images/nissin.jpg",
      category: "Instant Food"
    },
    {
      id: 4,
      name: "Too Yumm K-Bomb Hot & Spicy (80g)",
      price: 30,
      originalPrice: 45,
      image: "/images/kbomb.jpg",
      category: "Snacks & Beverages"
    },
    {
      id: 5,
      name: "Bingo Chilli Chips (90g)",
      price: 35,
      originalPrice: 50,
      image: "/images/bingo.jpg",
      category: "Snacks & Beverages"
    },
    {
      id: 6,
      name: "Lays Hot n Sweet Chilli (80g)",
      price: 39,
      originalPrice: 48,
      image: "/images/lays.jpg",
      category: "Snacks & Beverages"
    },
    {
      id: 7,
      name: "Kurkure Puffcorn Cheez (58g)",
      price: 18.49,
      originalPrice: 20,
      image: "/images/kurkure.jpg",
      category: "Snacks & Beverages"
    },
    {
      id: 8,
      name: "Lotte Choco Pie (504g)",
      price: 164,
      originalPrice: 205,
      image: "/images/choco.jpg",
      category: "Snacks & Beverages"
    }
  ]);
});