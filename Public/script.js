async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.getElementById("product-list"); // ⚠️ important
  container.innerHTML = "";

  products.forEach(product => {
    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="badge">${discount}% OFF</div>
      <img src="${product.image}" width="120">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p style="text-decoration:line-through;color:red;">
        ₹${product.originalPrice || ""}
      </p>
      <button>Add</button>
    `;

    container.appendChild(card);
  });

  // categories fix
  const categories = [...new Set(products.map(p => p.category))];
  const catDiv = document.getElementById("categories");
  catDiv.innerHTML = `<span>All</span>` +
    categories.map(c => `<span>${c}</span>`).join("");
}

loadProducts();