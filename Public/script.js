let allProducts = [];
let cart = {};

async function loadProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();

  allProducts = data;

  renderProducts(data);
  renderCategories(data);
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const discount = Math.round(
      ((p.originalPrice - p.price) / p.originalPrice) * 100
    );

    const qty = cart[p.id]?.qty || 0;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="badge">${discount}% OFF</div>
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p class="strike">₹${p.originalPrice}</p>
      <p class="price">₹${p.price}</p>

      ${
        qty === 0
        ? `<button onclick="addToCart(${p.id}, ${p.price}, '${p.name}', this)">Add</button>`
        : `
          <div class="qty-box">
            <button onclick="dec(${p.id})">−</button>
            <span>${qty}</span>
            <button onclick="inc(${p.id}, ${p.price}, '${p.name}')">+</button>
          </div>
        `
      }
    `;

    container.appendChild(div);
  });
}

/* ➕ Add */
function addToCart(id, price, name, btn) {
  if (!cart[id]) cart[id] = { qty: 0, price, name };

  cart[id].qty++;
  updateTotal();
  renderProducts(allProducts);

  animateAdd(btn);
}

/* ✨ Animation */
function animateAdd(btn) {
  const rect = btn.getBoundingClientRect();

  const clone = btn.cloneNode(true);
  clone.classList.add("fly");

  clone.style.left = rect.left + "px";
  clone.style.top = rect.top + "px";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = "90%";
    clone.style.top = "10px";
    clone.style.opacity = 0;
  }, 10);

  setTimeout(() => clone.remove(), 700);
}

/* ➕ */
function inc(id, price, name) {
  cart[id].qty++;
  updateTotal();
  renderProducts(allProducts);
}

/* ➖ */
function dec(id) {
  cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];

  updateTotal();
  renderProducts(allProducts);
}

/* 💰 */
function updateTotal() {
  let total = 0;
  Object.values(cart).forEach(i => total += i.qty * i.price);
  document.getElementById("total").innerText = total;
}

/* 📂 */
function renderCategories(products) {
  const cats = ["All", ...new Set(products.map(p => p.category))];

  const div = document.getElementById("categories");

  div.innerHTML = cats.map(c =>
    `<button onclick="filterCategory('${c}')">${c}</button>`
  ).join("");
}

function filterCategory(c) {
  if (c === "All") renderProducts(allProducts);
  else renderProducts(allProducts.filter(p => p.category === c));
}

/* 🔍 */
function searchProduct() {
  const val = document.getElementById("search").value.toLowerCase();

  renderProducts(allProducts.filter(p =>
    p.name.toLowerCase().includes(val)
  ));
}

/* 🧾 Checkout */
function openCheckout() {
  document.getElementById("checkoutModal").style.display = "block";

  let total = 0;
  const div = document.getElementById("orderSummary");
  div.innerHTML = "";

  Object.values(cart).forEach(i => {
    total += i.qty * i.price;
    div.innerHTML += `<p>${i.name} - ${i.qty} x ₹${i.price}</p>`;
  });

  document.getElementById("finalTotal").innerText = total;
}

function closeCheckout() {
  document.getElementById("checkoutModal").style.display = "none";
}

/* 💳 UPI */
function payUPI() {
  const total = document.getElementById("finalTotal").innerText;

  window.location.href =
    `upi://pay?pa=yourname@upi&pn=StudentSaver&am=${total}&cu=INR`;
}

loadProducts();