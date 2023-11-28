const productsController = new ProductsController(0);

// adds a new product card 
function addProductCard(product) {

  const productHTML = `
  <div class="col">
    <div class="card h-100 bg-secondary-subtle">
      <img style="width:auto; height:300px;" src="${product.image}" class="card-img-top" alt="${product.title}" 
        data-bs-toggle="modal" data-bs-target="#productModal" 
        data-product-title="${product.title}" data-product-description="${product.description}" 
        data-product-price="${product.price}" data-product-category="${product.category}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p>${product.category}</p>
        <p class="card-text truncated">${product.description}</p>
        <p class="card-text">$ ${product.price}</p>
      </div>
    </div>
  </div>`;

  const productsContainer = document.getElementById("list-products");
  productsContainer.innerHTML += productHTML;
}

let products = [];
async function displayProducts() {
  try {
    const nil = `<h5 style='text-align:center;'>Products are on the way</h5>
    <img src='images/artwork/worker.jpg' class='img-fluid mx-auto d-block mb-3' />`;
    const productsContainer = document.getElementById("productItems");
    // Fetch from backend
    const response = await fetch("http://localhost:8080/all");
    if (!response.ok) {
      throw new Error(productsContainer.innerHTML += nil)
    }
    products = await response.json();
    // Extract unique categories from products
    const uniqueCategories = [...new Set(products.map(product => product.category))];

    // Populate filter dropdown
    const categoryFilter = document.getElementById("categoryFilter");
    uniqueCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categoryFilter.add(option);
    });

    // Loop through each product and send to addProductCard function to append one after another
    products.forEach((product) => {
      addProductCard(product);
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

// Add an event listener to the document to listen for clicks on product images.
document.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".card-img-top")) {
    const productModal = document.getElementById("productModal");
    const productImage = document.getElementById("productImage");
    const productName = document.getElementById("productName");
    const productDescription = document.getElementById("productDescription");
    const productPrice = document.getElementById("productPrice");
    const productCategory = document.getElementById("productCategory");

    const productTitle = event.target.getAttribute("data-product-title");
    const productDescriptionText = event.target.getAttribute("data-product-description");
    const productPriceText = event.target.getAttribute("data-product-price");
    const productImageSrc = event.target.getAttribute("src");
    const productCategoryText = event.target.getAttribute("data-product-category");

    productName.innerText = productTitle;
    productDescription.innerText = productDescriptionText;
    productPrice.innerText = `$ ${productPriceText}`;
    productImage.src = productImageSrc;
    productCategory.innerText = productCategoryText;

    productModal.style.display = "block";
  }
});

// Close the modal when the close button is clicked
document.querySelector(".btn-close").addEventListener("click", function () {
  const productModal = document.getElementById("productModal");
  productModal.style.display = "none";
});

// document.getElementById('emailForm').addEventListener('submit', function(event) {
//   event.preventDefault(); 
//   var email = document.getElementById('email').value;
//   // regqx to check for email
//   var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   if (!regex.test(email)) {
//     return alert('Email is not valid')
//   } else {

//   alert('email had been sent')
//   window.location.reload()
//   }
// });
function updateSubject() {
  // Get values from the modal
  var productName = document.getElementById('productName').innerText;
  var productPrice = document.getElementById('productPrice').innerText;

  // Update the subject value in the form
  document.getElementById('productTitle').value = productName;
  document.getElementById('productCost').value = productPrice;
}
function filterProducts() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const productsContainer = document.getElementById("list-products");

  // Clear existing products
  productsContainer.innerHTML = "";

  // Filter products based on the selected category
  const filteredProducts = products.filter(product => {
    return selectedCategory === "all" || product.category === selectedCategory;
  });

  // Display filtered products
  filteredProducts.forEach(product => {
    addProductCard(product);
  });
}


displayProducts()

