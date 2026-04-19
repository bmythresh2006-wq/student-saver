
async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="badge">${discount}% OFF</div>
      <img src="${product.image}" width="100">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p style="text-decoration:line-through;color:red;">
        ₹${product.originalPrice}
      </p>
      <button>Add</button>
    `;

    container.appendChild(card);
  });
}

loadProducts();