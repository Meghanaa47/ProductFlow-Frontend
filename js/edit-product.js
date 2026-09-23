const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


document.addEventListener("DOMContentLoaded", loadProduct);


async function loadProduct() {

    if (!productId) {

        alert("Product ID is missing.");

        window.location.href = "products.html";

        return;
    }


    try {

        const product = await getProductById(productId);


        document.getElementById("name").value =
            product.name;

        document.getElementById("price").value =
            product.price;

        document.getElementById("category").value =
            product.category;


    } catch (error) {

        console.error(error);

        alert("Unable to load product.");

        window.location.href = "products.html";
    }
}


document
    .getElementById("editProductForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const product = {

            name: document
                .getElementById("name")
                .value
                .trim(),

            price: Number(
                document
                    .getElementById("price")
                    .value
            ),

            category: document
                .getElementById("category")
                .value
                .trim()
        };


        if (product.name === "" || product.category === "") {

            alert("Please fill all fields.");

            return;
        }


        try {

            await updateProduct(productId, product);

            showToast("Product updated successfully!");

            window.location.href = "products.html";


        } catch (error) {

            console.error(error);

           showToast("Failed to update product.", "error");
        }

    });