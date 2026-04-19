const cart = JSON.parse(localStorage.getItem("cart")) || {};

const summary = document.getElementById("orderSummary");

let total = 0;

Object.values(cart).forEach(item => {
  total += item.qty * item.price;

  summary.innerHTML += `
    <div class="order-item">
      <p>${item.name}</p>
      <p>${item.qty} x ₹${item.price}</p>
    </div>
  `;
});

document.getElementById("finalTotal").innerText = total;

const upiID = "yourname@upi";
const name = "StudentSaver";

const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${total}&cu=INR`;

document.getElementById("qrImage").src =
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

function payUPI() {
  window.location.href = upiLink;
}