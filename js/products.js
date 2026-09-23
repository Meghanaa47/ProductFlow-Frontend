let currentProducts = [];
let productToDelete = null;


document.addEventListener("DOMContentLoaded", function () {

    loadProducts();

    document
        .getElementById("cancelDelete")
        .addEventListener("click", cancelDelete);

    document
        .getElementById("confirmDelete")
        .addEventListener("click", confirmDelete);

});


async function loadProducts() {

    showLoadingState();

    try {

        const products = await getAllProducts();

        currentProducts = products;

        displayProducts(products);

    } catch (error) {

        console.error(error);

        showErrorState();

    }
}


/* =========================================================
   DISPLAY PRODUCTS
   ========================================================= */

function displayProducts(products) {

    currentProducts = products;

    const tableBody =
        document.getElementById("productTableBody");

    tableBody.innerHTML = "";

    document.getElementById("productCount").textContent =
        `${products.length} product${products.length !== 1 ? "s" : ""}`;


    if (products.length === 0) {

        showEmptyState();

        return;
    }


    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>₹${product.price}</td>

            <td>

                <a
                    href="edit-product.html?id=${product.id}"
                    class="edit-btn">
                    Edit
                </a>

                <button
                    class="delete-btn"
                    onclick="deleteProductById(${product.id})">
                    Delete
                </button>

            </td>
        `;

        tableBody.appendChild(row);
    });

}


/* =========================================================
   LOADING STATE
   ========================================================= */

function showLoadingState() {

    document.getElementById("productCount").textContent =
        "Loading...";

    document.getElementById("productTableBody").innerHTML = `
        <tr>
            <td colspan="5">
                <div class="table-state">
                    <div class="loading-spinner"></div>

                    <div>
                        <strong>Loading products</strong>
                        <p>Please wait while we fetch your products.</p>
                    </div>
                </div>
            </td>
        </tr>
    `;

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function showEmptyState() {

    document.getElementById("productCount").textContent =
        "0 products";

    document.getElementById("productTableBody").innerHTML = `
        <tr>
            <td colspan="5">
                <div class="table-state empty-state">

                    <div class="empty-icon">
                        +
                    </div>

                    <div>
                        <strong>No products found</strong>

                        <p>
                            Add a product or change your search and filters.
                        </p>
                    </div>

                </div>
            </td>
        </tr>
    `;

}


/* =========================================================
   ERROR STATE
   ========================================================= */

function showErrorState() {

    document.getElementById("productCount").textContent =
        "Unavailable";

    document.getElementById("productTableBody").innerHTML = `
        <tr>
            <td colspan="5">
                <div class="table-state error-state">

                    <div class="error-icon">
                        !
                    </div>

                    <div>
                        <strong>Unable to load products</strong>

                        <p>
                            Please check that the backend is running and try again.
                        </p>

                        <button
                            class="retry-btn"
                            onclick="loadProducts()">
                            Try Again
                        </button>
                    </div>

                </div>
            </td>
        </tr>
    `;

}


/* =========================================================
   SEARCH
   ========================================================= */

async function searchProduct() {

    const keyword =
        document.getElementById("searchInput").value.trim();


    if (keyword === "") {

        loadProducts();

        return;
    }


    try {

        showLoadingState();

        const products =
            await searchProducts(keyword);

        displayProducts(products);

    } catch (error) {

        console.error(error);

        showErrorState();

        showToast("Search failed.", "error");

    }

}


/* =========================================================
   PRICE FILTER
   ========================================================= */

async function filterByPrice() {

    const min =
        document.getElementById("minPrice").value;

    const max =
        document.getElementById("maxPrice").value;


    if (min === "" || max === "") {

        showToast(
            "Please enter both minimum and maximum price.",
            "error"
        );

        return;
    }


    if (Number(min) > Number(max)) {

        showToast(
            "Minimum price cannot be greater than maximum price.",
            "error"
        );

        return;
    }


    try {

        showLoadingState();

        const products =
            await filterProducts(min, max);

        displayProducts(products);

    } catch (error) {

        console.error(error);

        showErrorState();

        showToast("Price filter failed.", "error");

    }

}


/* =========================================================
   SORTING
   ========================================================= */

function sortProducts() {

    const sortValue =
        document.getElementById("sortSelect").value;

    let sortedProducts =
        [...currentProducts];


    if (sortValue === "name-asc") {

        sortedProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }


    else if (sortValue === "name-desc") {

        sortedProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    }


    else if (sortValue === "price-asc") {

        sortedProducts.sort((a, b) =>
            a.price - b.price
        );

    }


    else if (sortValue === "price-desc") {

        sortedProducts.sort((a, b) =>
            b.price - a.price
        );

    }


    else if (sortValue === "id-desc") {

        sortedProducts.sort((a, b) =>
            b.id - a.id
        );

    }


    displayProducts(sortedProducts);

}


/* =========================================================
   DELETE
   ========================================================= */

function deleteProductById(id) {

    productToDelete = id;

    document
        .getElementById("deleteModal")
        .classList.add("show");

}


function cancelDelete() {

    productToDelete = null;

    document
        .getElementById("deleteModal")
        .classList.remove("show");

}


async function confirmDelete() {

    if (productToDelete === null) {
        return;
    }


    try {

        await deleteProduct(productToDelete);

        document
            .getElementById("deleteModal")
            .classList.remove("show");

        showToast(
            "Product deleted successfully."
        );

        productToDelete = null;

        loadProducts();

    } catch (error) {

        console.error(error);

        document
            .getElementById("deleteModal")
            .classList.remove("show");

        showToast(
            "Failed to delete product.",
            "error"
        );

        productToDelete = null;

    }

}