let cart = {};
let allProducts = [];
let currentCategory = "All";

fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    createTabs();
    render(data);
  });

// 🔥 CATEGORY TABS
function createTabs() {
  const tabs = document.getElementById("tabs");

  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "tab";
    div.innerText = cat;

    div.onclick = () => {
      currentCategory = cat;
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      div.classList.add("active");
      filterProducts();
    };

    tabs.appendChild(div);
  });

  tabs.children[0].classList.add("active");
}

function filterProducts() {
  let filtered = allProducts;

  if (currentCategory !== "All") {
    filtered = allProducts.filter(p => p.category === currentCategory);
  }

  render(filtered);
}

// 🔥 RENDER
function render(products) {
  const app = document.getElementById("app");
  app.innerHTML = '<div class="grid"></div>';
  const grid = app.querySelector(".grid");

  products.forEach(p => {
    const qty = cart[p.id]?.qty || 0;
    const save = p.mrp - p.price;
    const percent = Math.round((save / p.mrp) * 100);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="badge">${percent}% OFF</div>
      <img src="${p.img}">
      <h4>${p.name}</h4>

      <div class="price">₹${p.price}</div>
      <div class="mrp">₹${p.mrp}</div>

      ${
        qty === 0
          ? `<button onclick="addItem(${p.id})">Add</button>`
          : `
          <div>
            <button onclick="decrease(${p.id})">-</button>
            ${qty}
            <button onclick="increase(${p.id})">+</button>
          </div>
        `
      }
    `;

    grid.appendChild(div);
  });
}

// CART FUNCTIONS
function addItem(id) {
  const product = allProducts.find(p => p.id === id);
  cart[id] = { ...product, qty: 1 };
  updateTotal();
  filterProducts();
}

function increase(id) {
  cart[id].qty++;
  updateTotal();
  filterProducts();
}

function decrease(id) {
  cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];
  updateTotal();
  filterProducts();
}

function updateTotal() {
  let total = 0;
  Object.values(cart).forEach(i => total += i.price * i.qty);
  document.getElementById("total").innerText = total.toFixed(2);
}

// CHECKOUT
function checkout() {
  document.getElementById("paymentBox").style.display = "block";

  let html = "<h3>Order Summary</h3>";
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;

    html += `
      <div style="display:flex; margin:10px;">
        <img src="${item.img}" width="50">
        <div style="margin-left:10px;">
          ${item.name}<br>
          ${item.qty} x ₹${item.price}
        </div>
      </div>
    `;
  });

  document.getElementById("orderSummary").innerHTML = html;
  document.getElementById("payAmount").innerText = total.toFixed(2);
}

// ORDER
function submitOrder() {
  document.getElementById("message").innerText =
    "Order confirmed 🚚 Delivery tomorrow 1–2 PM";
}

// SEARCH
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(val));
  render(filtered);
});