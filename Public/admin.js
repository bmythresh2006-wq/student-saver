let products = [];
let editId = null;

// 🔥 LOAD PRODUCTS FROM SERVER
async function loadProducts() {
  const res = await fetch("/api/products");
  products = await res.json();
  displayProducts();
}

// 🔥 ADD / UPDATE PRODUCT
async function addProduct() {
  let name = document.getElementById("name").value;
  let original = document.getElementById("original").value;
  let selling = document.getElementById("selling").value;
  let category = document.getElementById("category").value;
  let imageFile = document.getElementById("image").files[0];

  let image = "";

  // Convert image to base64
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = async function () {
      image = reader.result;
      await saveProduct({ name, original, selling, category, image });
    };
    reader.readAsDataURL(imageFile);
  } else {
    await saveProduct({ name, original, selling, category });
  }
}

async function saveProduct(product) {
  if (editId) {
    await fetch(`/api/product/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    editId = null;
  } else {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
  }

  clearForm();
  loadProducts();
}

// 🔥 DISPLAY PRODUCTS WITH EDIT/DELETE
function displayProducts() {
  let list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.image || ''}">
        <div>
          <b>${p.name}</b><br>
          ₹${p.selling}
        </div>

        <div class="actions">
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

// 🔥 DELETE
async function deleteProduct(id) {
  await fetch(`/api/product/${id}`, { method: "DELETE" });
  loadProducts();
}

// 🔥 EDIT
function editProduct(id) {
  let p = products.find(x => x.id === id);

  document.getElementById("name").value = p.name;
  document.getElementById("original").value = p.original;
  document.getElementById("selling").value = p.selling;
  document.getElementById("category").value = p.category;

  editId = id;
}

// 🔥 CLEAR FORM
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("original").value = "";
  document.getElementById("selling").value = "";
}

// 🔥 LOAD ON START
loadProducts();