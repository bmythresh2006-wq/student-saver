async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const discount = Math.round(
      ((p.originalPrice - p.price) / p.originalPrice) * 100
    );

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="badge">${discount}% OFF</div>
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p class="strike">₹${p.originalPrice}</p>
      <button>Add</button>
    `;

    container.appendChild(div);
  });

  // categories
  const categories = [...new Set(products.map(p => p.category))];
  const catDiv = document.getElementById("categories");

  catDiv.innerHTML = "All " + categories.join(" ");
}

loadProducts();