let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

function addProduct() {
  let name = document.getElementById("name").value;
  let original = document.getElementById("original").value;
  let selling = document.getElementById("selling").value;
  let category = document.getElementById("category").value;
  let imageFile = document.getElementById("image").files[0];

  if (!imageFile) {
    alert("Upload image!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function () {
    let product = {
      name,
      original,
      selling,
      category,
      image: reader.result
    };

    if (editIndex === -1) {
      products.push(product);
    } else {
      products[editIndex] = product;
      editIndex = -1;
    }

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    clearForm();
  };

  reader.readAsDataURL(imageFile);
}

function displayProducts() {
  let list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <div>
          <b>${p.name}</b><br>
          ₹${p.selling}
        </div>

        <div class="actions">
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

function editProduct(index) {
  let p = products[index];

  document.getElementById("name").value = p.name;
  document.getElementById("original").value = p.original;
  document.getElementById("selling").value = p.selling;
  document.getElementById("category").value = p.category;

  editIndex = index;
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("original").value = "";
  document.getElementById("selling").value = "";
}

displayProducts();