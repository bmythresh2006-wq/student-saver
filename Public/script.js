let products = [];
let cart = [];

// 🔥 LOAD PRODUCTS FROM BACKEND
async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    products = await res.json();
    displayProducts(products);
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// 🔥 DISPLAY PRODUCTS
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    let original = Number(p.original || 0);
    let selling = Number(p.selling || 0);

    let discount = 0;
    if (original > 0) {
      discount = Math.round(((original - selling) / original) * 100);
    }

    container.innerHTML += `
      <div class="item">
        <div class="badge">${discount}% OFF</div>

        <img src="${p.image || ''}" alt="">
        <h3>${p.name}</h3>

        <p style="text-decoration: line-through;">₹${original}</p>
        <p>₹${selling}</p>

        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

// 🔥 ADD TO CART
function addToCart(id) {
  let item = products.find(p => p.id === id);

  if (!item) return;

  cart.push(item);
  updateCart();
}

// 🔥 UPDATE CART
function updateCart() {
  let total = 0;

  cart.forEach(item => {
    total += Number(item.selling || 0);
  });

  // cart count
  document.getElementById("cartCount").innerText = cart.length;

  // total (if exists)
  let totalEl = document.getElementById("total");
  if (totalEl) {
    totalEl.innerText = total;
  }
}

// 🔥 SEARCH PRODUCTS
function searchProducts() {
  let text = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(text)
  );

  displayProducts(filtered);
}

// 🔥 LOAD ON PAGE START
loadProducts();