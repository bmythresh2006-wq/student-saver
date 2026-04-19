let allProducts = [];
let cart = {};

async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();
  allProducts = products;

  renderProducts(products);
  renderCategories(products);
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const discount = Math.round(((p.originalPrice - p.price)/p.originalPrice)*100);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p style="color:green">${discount}% OFF</p>
      <p class="strike">₹${p.originalPrice}</p>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id}, ${p.price}, '${p.name}')">Add</button>
    `;

    container.appendChild(div);
  });
}

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

function searchProduct() {
  const val = document.getElementById("search").value.toLowerCase();
  renderProducts(allProducts.filter(p => p.name.toLowerCase().includes(val)));
}

function addToCart(id, price, name) {
  if (!cart[id]) cart[id] = {qty:0, price, name};
  cart[id].qty++;
  updateTotal();
}

function updateTotal() {
  let total = 0;
  Object.values(cart).forEach(i => total += i.qty*i.price);
  document.getElementById("total").innerText = total;
}

function openCheckout() {
  document.getElementById("checkoutPage").style.display = "block";

  let total = 0;
  const div = document.getElementById("orderSummary");
  div.innerHTML = "";

  Object.values(cart).forEach(i => {
    total += i.qty*i.price;
    div.innerHTML += `<p>${i.name} - ${i.qty} x ₹${i.price}</p>`;
  });

  document.getElementById("finalTotal").innerText = total;
}

function payUPI() {
  const total = document.getElementById("finalTotal").innerText;
  window.location.href = `upi://pay?pa=yourname@upi&pn=StudentSaver&am=${total}&cu=INR`;
}

loadProducts();