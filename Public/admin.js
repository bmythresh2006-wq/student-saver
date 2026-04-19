let allProducts = [];
let editId = null;

async function loadProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();

  allProducts = data;
  renderTable(data);
}

function renderTable(products) {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  products.forEach(p => {
    body.innerHTML += `
      <tr>
        <td><img src="${p.image}" width="50"></td>
        <td>${p.name}</td>
        <td>₹${p.originalPrice}</td>
        <td>₹${p.price}</td>
        <td>${p.category}</td>
        <td>
          <button onclick="openEdit('${p._id}')">Edit</button>
          <button onclick="deleteProduct('${p._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function saveProduct() {
  const product = {
    name: name.value,
    originalPrice: Number(mrp.value),
    price: Number(price.value),
    category: category.value,
    image: "/" + image.value
  };

  await fetch("/api/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  alert("Added!");
  loadProducts();
}

async function deleteProduct(id) {
  await fetch("/api/product/" + id, { method: "DELETE" });
  loadProducts();
}

function openEdit(id) {
  const p = allProducts.find(x => x._id === id);

  editId = id;

  editName.value = p.name;
  editMRP.value = p.originalPrice;
  editPrice.value = p.price;
  editCategory.value = p.category;
  editImage.value = p.image.replace("/", "");

  document.getElementById("editModal").style.display = "flex";
}

async function updateProduct() {
  const updated = {
    name: editName.value,
    originalPrice: Number(editMRP.value),
    price: Number(editPrice.value),
    category: editCategory.value,
    image: "/" + editImage.value
  };

  await fetch("/api/product/" + editId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  });

  closeModal();
  loadProducts();
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function searchAdmin() {
  const val = adminSearch.value.toLowerCase();

  renderTable(allProducts.filter(p =>
    p.name.toLowerCase().includes(val)
  ));
}

loadProducts();