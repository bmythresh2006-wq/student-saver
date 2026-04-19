// UPDATE FULL PRODUCT
app.put("/api/product/:id", (req, res) => {
  const id = Number(req.params.id);
  const updated = req.body;

  products = products.map(p =>
    p.id === id ? { ...p, ...updated } : p
  );

  res.json({ success: true });
});