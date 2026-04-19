let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || []; 
// cart item shape: { id, name, selling, image, qty }

async function loadProducts() {
  const res = await fetch("/api/products");
  products = await res.json();
  displayProducts(products);
  updateCart();
}

// 🔥 DISPLAY PRODUCTS
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    const original = Number(p.original || 0);
    const selling = Number(p.selling || 0);
    const discount = original ? Math.round(((original - selling) / original) * 100) : 0;

    container.innerHTML += `
      <div class="item">
        <div class="badge">${discount}% OFF</div>

        <img src="${p.image || ''}">
        <h3>${p.name}</h3>

        <p style="text-decoration: line-through;">₹${original}</p>
        <p>₹${selling}</p>

        <div class="qty-box">
          <button onclick="decreaseQty(${p.id})">-</button>
          <span id="qty-${p.id}">${getQty(p.id)}</span>
          <button onclick="increaseQty(${p.id})">+</button>
        </div>

        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

// 🔥 ADD / INCREASE
function addToCart(id) {
  let item = cart.find(x => x.id === id);

  if (item) {
    item.qty += 1;
  } else {
    let p = products.find(x => x.id === id);
    cart.push({ ...p, qty: 1 });
  }

  saveCart();
}

// 🔥 INCREASE
function increaseQty(id) {
  let item = cart.find(x => x.id === id);
  if (item) {
    item.qty++;
  } else {
    addToCart(id);
    return;
  }
  saveCart();
}

// 🔥 DECREASE
function decreaseQty(id) {
  let item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    cart = cart.filter(x => x.id !== id);
  }

  saveCart();
}

// 🔥 GET QTY FOR UI
function getQty(id) {
  let item = cart.find(x => x.id === id);
  return item ? item.qty : 0;
}

// 🔥 SAVE + UPDATE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  displayProducts(products);
}

// 🔥 UPDATE CART COUNT
function updateCart() {
  let totalQty = 0;
  cart.forEach(i => totalQty += i.qty);
  document.getElementById("cartCount").innerText = totalQty;
}

// 🔥 SEARCH
function searchProducts() {
  let text = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(text));
  displayProducts(filtered);
}

// 🔥 CATEGORY
function filterCategory(cat) {
  if (cat === "All") displayProducts(products);
  else displayProducts(products.filter(p => p.category === cat));
}

// 🔥 GO TO CHECKOUT
function goToCheckout() {
  window.location.href = "checkout.html";
}

loadProducts();