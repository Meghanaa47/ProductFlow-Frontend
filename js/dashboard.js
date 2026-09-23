document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {
try {

    // Get all products
    const products = await getAllProducts();

    // Total products
    document.getElementById("totalProducts").textContent =
        products.length;

    // Get unique categories
    const categories = new Set(
        products.map(product => product.category)
    );

    document.getElementById("totalCategories").textContent =
        categories.size;

    // Get highest-priced product
    const highProduct = await getHighPriceProduct();

    document.getElementById("highestPrice").textContent =
        `₹${highProduct.price}`;

    // Display recently added products
    displayRecentProducts(products);

    // Get category counts
    const categoryData = await getCategoryCount();

    displayCategoryStats(categoryData);

} catch (error) {

    console.error(error);

    document.getElementById("recentProducts").textContent =
        "Unable to load product data.";

    document.getElementById("categoryStats").textContent =
        "Unable to load category data.";
}

}

/* =========================================================
RECENTLY ADDED PRODUCTS
========================================================= */

function displayRecentProducts(products) {

const container =
    document.getElementById("recentProducts");

container.innerHTML = "";

if (products.length === 0) {

    container.textContent =
        "No products available.";

    return;
}

// Sort by ID so newest products appear first
const recentProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

recentProducts.forEach(product => {

    const div = document.createElement("div");

    div.className = "recent-product-item";

    div.innerHTML = `
        <div class="recent-product-info">

            <span class="recent-product-name">
                ${product.name}
            </span>

            <span class="recent-product-category">
                ${product.category}
            </span>

        </div>

        <span class="recent-product-price">
            ₹${product.price}
        </span>
    `;

    container.appendChild(div);
});

}

/* =========================================================
CATEGORY STATISTICS
========================================================= */

function displayCategoryStats(categoryData) {

const container =
    document.getElementById("categoryStats");

container.innerHTML = "";

if (categoryData.length === 0) {

    container.textContent =
        "No category data available.";

    return;
}

categoryData.forEach(item => {

    const category = item[0];
    const count = item[1];

    const div = document.createElement("div");

    div.className = "category-item";

    div.innerHTML = `
        <span class="category-name">${category}</span>
        <span class="category-count">${count}</span>
    `;

    container.appendChild(div);
});

}
