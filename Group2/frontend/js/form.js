const productsController = new ProductsController(0);
let isEditMode = false;

// Get common elements
const newForm = document.getElementById('newForm');
const newProductImg = document.getElementById('product_image');
const newProductTitle = document.getElementById('title');
const newProductDescription = document.getElementById('description');
const newProductPrice = document.getElementById('price');
const newProductCategory = document.getElementById('category');

// Add an event listener to the form 
newForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const image = newProductImg.value;
    const title = newProductTitle.value;
    const description = newProductDescription.value;
    const price = newProductPrice.value;
    const category = newProductCategory.value;

    if (isEditMode !== false) {
        // If we're in edit mode, update the existing product
        const product = productsController.products.find((item) => item.id === editingProductId);
        if (product) {
            product.image = image;
            product.title = title;
            product.description = description;
            product.price = price;
            product.category = category;
            productsController.updateProduct(product);
            isEditMod = false; // Exit edit mode
        }
    } else {
        // If not in edit mode, add a new product
        productsController.addProduct(title, image, price, description, category);
        //Bootstrap 5 to show toast
        var toastEl = document.querySelector('.toast');
        var toast = new bootstrap.Toast(toastEl);
        toast.show();

        // refreshes window after 1 seconds
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

    // reset the form
    newForm.reset();
});

// append new item to the empty array below the admin console
function addAdminData(product) {
    const productHTML =
        `  
        <td>${product.id}</td>
        <td><img src=${product.image} style='width:100px; height:100px;'></td>
        <td class="align-middle"><strong>${product.title}</strong></td>
        <td class="d-none d-md-table-cell align-middle truncated ">${product.description}</td>
        <td class="d-none d-md-table-cell align-middle">$${product.price}</td>
        <td class="d-none d-md-table-cell align-middle">${product.category}</td>
        <td class="d-grid">
        <button type="button" class="btn btn-success btn-sm mb-1" data-bs-toggle="modal" data-bs-target="#productModal" data-bs-product-id="${product.id}">View</button>
        <button class="btn btn-warning btn-sm mb-1" type="button" onclick="editProduct(${product.id})">Edit</button>
        <button class="btn btn-danger btn-sm" type="button" onclick="confirmDelete(${product.id})">Delete</button>
        </td>
        `
    const productsContainer = document.getElementById("admin")
    productsContainer.innerHTML = productHTML + productsContainer.innerHTML
}

// add edit function
async function editProduct(productId) {
    try {
      // Fetch the product details from the server
      const response = await fetch(`http://localhost:8080/${productId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product with id ${productId}`);
      }
      const product = await response.json();
  
      // Display the form with the product details for editing
      document.getElementById('submit').style.display = 'none';
      document.getElementById('update').style.display = 'block';
      isEditMode = true;
      window.scrollTo(0, 0);
  
      // Populate the form with the product details
      newProductImg.value = product.image;
      newProductTitle.value = product.title;
      newProductDescription.value = product.description;
      newProductPrice.value = product.price;
      newProductCategory.value = product.category;
  
      // Update the product on the server
      document.querySelector('#update').onclick = async function () {
        // Update the product object
        product.image = newProductImg.value;
        product.title = newProductTitle.value;
        product.description = newProductDescription.value;
        product.price = newProductPrice.value;
        product.category = newProductCategory.value;
  
        // Send a PUT request to update the product on the server
        const updateResponse = await fetch(`http://localhost:8080/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
  
        if (updateResponse.ok) {
          // Update the product in the local productsController
          productsController.updateProduct(product);
          
          // Reload or update your product display as needed
          window.location.reload();
  
          // Reset the form and hide the update button
          newForm.reset();
          document.getElementById('submit').style.display = 'block';
          document.getElementById('update').style.display = 'none';
        } else {
          console.error('Failed to update product on the server');
        }
      };
    } catch (error) {
      console.error('Error editing product:', error.message);
    }
  }
  
function confirmDelete(productId) {
    // Use window.confirm() to ask for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
        // If the user confirms, proceed with the deletion
        deleteProduct(productId);
        window.location.reload()
    } else {
        // If the user cancels, do nothing or provide feedback if needed
        console.log("Deletion canceled");
    }
}

// add delete function
function deleteProduct(productId) {
    productsController.deleteDataFromServer(productId);
}

// call out the product list
async function displayAdminProducts() {
    try {
        // Fetch from backend
        const response = await fetch("http://localhost:8080/all");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        // Loop through each product and send to addProductCard function to append one after another
          products.forEach((product) => {
            addAdminData(product);
          });
        } catch (error) {
        console.error("Error fetching products:", error.message);
        }
      }

const productModal = document.getElementById('productModal');
if (productModal) {
    productModal.addEventListener('show.bs.modal', async (event) => {
        // Delay execution to ensure modal content is loaded
        const button = event.relatedTarget;
        const getThisId = button.getAttribute('data-bs-product-id');

        try {
            // Fetch the product details from the server
            const response = await fetch(`http://localhost:8080/${getThisId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch product with id ${id}`);
            }
            const product = await response.json();

            const productName = document.getElementById('productName');
            const productPrice = document.getElementById('productPrice');
            const productImage = document.getElementById('productImage');
            const productDescription = document.getElementById('productDescription');
            const productCategory = document.getElementById('productCategory');

            productName.innerText = product.title;
            productPrice.innerText = `$ ${product.price}`;
            productImage.src = product.image;
            productDescription.innerText = product.description;
            productCategory.innerText = product.category;
        } catch (error) {
            console.error("Error fetching product:", error.message);
        }
    });
}

// update image concurrently when user input
function updateImage() {
  // Get the input element and the image element
  const imageInput = document.getElementById('product_image');
  const previewImage = document.getElementById('preview_image');

  // Set the src attribute of the preview image
  previewImage.src = imageInput.value;
}
// Check if the user is logged in
if (sessionStorage.getItem('loggedIn') !== 'true') {
  // Redirect to the login page if not logged in
  window.location.href = 'login.html';
  }

//call out function
displayAdminProducts()
