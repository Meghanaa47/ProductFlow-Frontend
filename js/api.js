const API_URL = "http://localhost:8081/product";


async function getAllProducts() {
    const response = await fetch(`${API_URL}/allproducts`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return await response.json();
}


async function getHighPriceProduct() {
    const response = await fetch(`${API_URL}/highpriceproduct`);

    if (!response.ok) {
        throw new Error("Failed to fetch highest-priced product");
    }

    return await response.json();
}


async function getCategoryCount() {
    const response = await fetch(`${API_URL}/countbycategory`);

    if (!response.ok) {
        throw new Error("Failed to fetch category data");
    }

    return await response.json();
}


async function getProductById(id) {
    const response = await fetch(`${API_URL}/id/${id}`);

    if (!response.ok) {
        throw new Error("Product not found");
    }

    return await response.json();
}


async function addProduct(product) {
    const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Failed to add product");
    }

    return await response.json();
}


async function updateProduct(id, product) {
    const response = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Failed to update product");
    }

    return await response.json();
}


async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }

    return await response.text();
}


async function searchProducts(keyword) {
    const response = await fetch(
        `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`
    );

    if (!response.ok) {
        throw new Error("Search failed");
    }

    return await response.json();
}


async function filterProducts(min, max) {
    const response = await fetch(
        `${API_URL}/filter?min=${min}&max=${max}`
    );

    if (!response.ok) {
        throw new Error("Filter failed");
    }

    return await response.json();
}


async function filterByCategoryAndPrice(category, price) {
    const response = await fetch(
        `${API_URL}/category-price?category=${encodeURIComponent(category)}&price=${price}`
    );

    if (!response.ok) {
        throw new Error("Category filter failed");
    }

    return await response.json();
}