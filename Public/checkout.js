let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
  let container = document.getElementById("cartItems");
  let total = 0;

  container.innerHTML = "";

  cart.forEach(item => {
    let price = Number(item.selling || 0);
    let subtotal = price * item.qty;
    total += subtotal;

    container.innerHTML += `
      <div style="margin:10px 0;">
        ${item.name} 
        (₹${price} x ${item.qty}) = ₹${subtotal}
      </div>
    `;
  });

  document.getElementById("total").innerText = total;

  generateUPI(total);
}

// 🔥 GENERATE UPI QR
function generateUPI(amount) {
  let upiID = "8074923472@ybl";   // 🔥 CHANGE THIS
  let name = "Student Saver";

  let upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

  // QR API
  document.getElementById("upiQR").src =
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  window.upiLink = upiLink;
}

// 🔥 OPEN UPI APP
function payUPI() {
  window.location.href = window.upiLink;
}

loadCart();