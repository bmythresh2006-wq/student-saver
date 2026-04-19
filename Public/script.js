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
    const qty = cart[p.id]?.qty || 0;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>

      <div class="qty-box">
        <button onclick="decrease(${p.id})">-</button>
        <span>${qty}</span>
        <button onclick="increase(${p.id}, ${p.price}, '${p.name}')">+</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// CATEGORY
function renderCategories(products) {
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const div = document.getElementById("categories");

  div.innerHTML = categories.map(c =>
    `<button onclick="filterCategory('${c}')">${c}</button>`
  ).join("");
}

// FILTER
function filterCategory(category) {
  if (category === "All") renderProducts(allProducts);
  else renderProducts(allProducts.filter(p => p.category === category));
}

// SEARCH
function searchProducts() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(filtered);
}

// CART
function increase(id, price, name) {
  if (!cart[id]) cart[id] = { qty: 0, price, name };

  cart[id].qty++;
  updateTotal();
  animateCart();
  renderProducts(allProducts);
}

function decrease(id) {
  if (!cart[id]) return;

  cart[id].qty--;

  if (cart[id].qty <= 0) delete cart[id];

  updateTotal();
  renderProducts(allProducts);
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

// UPI PAYMENT
function payNow() {
  let total = document.getElementById("finalTotal").innerText;

  const upi = `upi://pay?pa=yourname@upi&pn=StudentSaver&am=${total}&cu=INR`;

  window.location.href = upi;
}

// ANIMATION
function animateCart() {
  const bar = document.querySelector(".top-bar");
  bar.style.transform = "scale(1.1)";
  setTimeout(() => {
    bar.style.transform = "scale(1)";
  }, 200);
}

loadProducts();