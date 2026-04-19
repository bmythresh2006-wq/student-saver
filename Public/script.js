let allProducts = [];
let cart = {};

// LOAD PRODUCTS
async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  allProducts = products;

  renderProducts(products);
  renderCategories(products);
}

// SHOW PRODUCTS
function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}" width="120">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id}, ${p.price}, '${p.name}')">Add</button>
    `;

    container.appendChild(div);
  });
}

// CATEGORY BUTTONS
function renderCategories(products) {
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const div = document.getElementById("categories");

  div.innerHTML = categories.map(c =>
    `<button onclick="filterCategory('${c}')">${c}</button>`
  ).join("");
}

// FILTER
function filterCategory(category) {
  if (category === "All") {
    renderProducts(allProducts);
  } else {
    renderProducts(allProducts.filter(p => p.category === category));
  }
}

// CART
function addToCart(id, price, name) {
  if (!cart[id]) cart[id] = { qty: 0, price, name };

  cart[id].qty++;
  updateTotal();
}

// TOTAL
function updateTotal() {
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.qty * item.price;
  });

  document.getElementById("total").innerText = total;
}

// CHECKOUT
function openCheckout() {
  const page = document.getElementById("checkoutPage");
  page.style.display = "block";

  const summary = document.getElementById("orderSummary");
  summary.innerHTML = "";

  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.qty * item.price;

    summary.innerHTML += `
      <p>${item.name} - ${item.qty} x ₹${item.price}</p>
    `;
  });

  document.getElementById("finalTotal").innerText = total;
}

// START
loadProducts();