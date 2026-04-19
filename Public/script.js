let cart = {};

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

      <div class="qty">
        <button onclick="decrease(${p.id})">-</button>
        <span id="qty-${p.id}">0</span>
        <button onclick="increase(${p.id}, ${p.price})">+</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function increase(id, price) {
  if (!cart[id]) cart[id] = { qty: 0, price: price };

  cart[id].qty++;
  document.getElementById(`qty-${id}`).innerText = cart[id].qty;

  updateTotal();
}

function decrease(id) {
  if (!cart[id] || cart[id].qty === 0) return;

  cart[id].qty--;
  document.getElementById(`qty-${id}`).innerText = cart[id].qty;

  updateTotal();
}

function updateTotal() {
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.qty * item.price;
  });

  document.getElementById("total").innerText = total;
}

loadProducts();
function checkout() {
  let total = document.getElementById("total").innerText;

  if (total == 0) {
    alert("Cart is empty");
    return;
  }

  const upiID = "yourname@upi"; // change this
  const name = "Student Saver";

  const url = `upi://pay?pa=${upiID}&pn=${name}&am=${total}&cu=INR`;

  window.location.href = url;
}