const cart = JSON.parse(localStorage.getItem("cart")) || {};

const summary = document.getElementById("orderSummary");

let total = 0;

// 🛒 Show items
Object.values(cart).forEach(item => {
  total += item.qty * item.price;

  summary.innerHTML += `
    <div class="order-item">
      <p>${item.name}</p>
      <p>${item.qty} x ₹${item.price}</p>
    </div>
  `;
});

// 💰 Total
document.getElementById("finalTotal").innerText = total;

// 💳 UPI details
const upiID = "yourname@upi";
const name = "StudentSaver";

// 🔗 UPI Link
const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${total}&cu=INR`;

// 📷 Generate QR
document.getElementById("qrImage").src =
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

// 💳 Pay button
function payUPI() {
  window.location.href = upiLink;
}