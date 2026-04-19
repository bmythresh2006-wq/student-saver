function updateCart() {
  let total = 0;

  cart.forEach(item => {
    total += Number(item.selling || 0);
  });

  // cart count (top bar number)
  document.getElementById("cartCount").innerText = cart.length;

  // total price (if you have total display)
  let totalEl = document.getElementById("total");
  if (totalEl) {
    totalEl.innerText = total;
  }
}