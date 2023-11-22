// create a ProductsController Class
class ProductsController {
    // initialize this.products property and make it into empty array
    constructor(currentId = 0) {
        this.products = [];
        this.currentId = currentId;
    }

    getProduct(id) {
        let product;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return product = this.products[i][id];
            }
        }
    }

    //create an addProduct method
    async addProduct(title, image, price, description, category) {
        try {
            // Make a POST request to the backend API
            const response = await fetch("http://localhost:8080/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    image: image,
                    price: price,
                    description: description,
                    category: category,
                }),
            }); 
            if (!response.ok) {
                throw new Error(`Failed to add product: ${response.statusText}`);
            } 
            // backend returns the added product
            const addedProduct = await response.json();
            // Update the local state or perform any other necessary actions
            console.log("Product added successfully:", addedProduct);
        } catch (error) {
            console.error("Error adding product:", error.message);
            // Handle error - show an alert or update UI accordingly
        }
    }

    // update package
    updateProduct(product) {
        // locate the id
        const index = this.products.findIndex(item => item.id === product.id);
        if (index !== -1) {
            this.products[index] = product;
        }
    }

    // del from local storage
    async deleteDataFromServer(productId) {
        try {
            const response = await fetch(`http://localhost:8080/${productId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete product: ${response.statusText}`);
            }
    
            // Assuming the backend responds with a success message
            const result = await response.json();
    
            console.log("Product deleted successfully:", result);
    
            // Optionally, you can perform any additional actions after successful deletion
        } catch (error) {
            console.error("Error deleting product:", error.message);
            // Handle error - show an alert or update UI accordingly
        }
    }
}