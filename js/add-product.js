document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("addProductForm");

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const product = {
            name: document.getElementById("name").value.trim(),
            price: Number(document.getElementById("price").value),
            category: document.getElementById("category").value.trim()
        };

        if (product.name === "" || product.category === "") {
            showToast("Please fill all fields.", "error");
            return;
        }

        try {

            await addProduct(product);

            showToast("Product added successfully!");

            setTimeout(() => {
                window.location.href = "products.html";
            }, 1000);

        } catch (error) {

            console.error(error);
            showToast("Failed to add product.", "error");

        }

    });

});