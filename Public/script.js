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

    const qty = cart[p._id]?.qty || 0;

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
        ? `<button onclick="addToCart('${p._id}', ${p.price}, '${p.name}')">Add</button>`
        : `
          <div class="qty-box">
            <button onclick="dec('${p._id}')">−</button>
            <span>${qty}</span>
            <button onclick="inc('${p._id}', ${p.price}, '${p.name}')">+</button>
          </div>
        `
      }
    `;

    container.appendChild(div);
  });
}

/* ADD */
function addToCart(id, price, name) {
  if (!cart[id]) cart[id] = { qty: 0, price, name };

  cart[id].qty++;
  updateTotal();
  renderProducts(allProducts);
}

/* INC */
function inc(id, price, name) {
  cart[id].qty++;
  updateTotal();
  renderProducts(allProducts);
}

/* DEC */
function dec(id) {
  cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];

  updateTotal();
  renderProducts(allProducts);
}

/* TOTAL */
function updateTotal() {
  let total = 0;
  Object.values(cart).forEach(i => total += i.qty * i.price);
  document.getElementById("total").innerText = total;
}

/* CATEGORY */
function renderCategories(products) {
  const cats = ["All", ...new Set(products.map(p => p.category))];

  document.getElementById("categories").innerHTML =
    cats.map(c => `<button onclick="filterCategory('${c}')">${c}</button>`).join("");
}

function filterCategory(c) {
  if (c === "All") renderProducts(allProducts);
  else renderProducts(allProducts.filter(p => p.category === c));
}

/* SEARCH */
function searchProduct() {
  const val = document.getElementById("search").value.toLowerCase();

  renderProducts(allProducts.filter(p =>
    p.name.toLowerCase().includes(val)
  ));
}

/* ✅ NEW CHECKOUT (NO POPUP) */
function openCheckout() {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "/checkout.html";
}

loadProducts();