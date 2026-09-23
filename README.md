# ProductFlow – Product Management System

## 🚀 Overview

ProductFlow is a full-stack **Product Management System** designed to manage products through a clean and professional web interface.

The project consists of a **Java Spring Boot backend** that provides REST APIs and a **JavaScript frontend** that consumes those APIs to perform product management operations.

The application supports adding, viewing, updating, deleting, searching, filtering, and sorting products.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Live Server

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL
* JPQL
* REST APIs

### Tools

* Spring Tool Suite (STS)
* Visual Studio Code
* Git & GitHub
* Postman

---

## ✨ Features

### Dashboard

* Total products count
* Total categories count
* Highest product price
* Recently added products
* Products grouped by category
* Quick navigation actions

### Product Management

* View all products
* Add a new product
* Edit product details
* Delete products
* Search by product name or category
* Filter products by price range
* Sort products by name, price, or recently added

### Backend API

* RESTful API architecture
* CRUD operations
* JPQL queries
* Search and filtering
* Category-based aggregation
* Highest-priced product using subquery
* Bulk product insertion
* CORS support for frontend integration

---

## 📂 Project Structure

### Frontend

```text
ProductFlow-Frontend/
│
├── index.html
├── products.html
├── add-product.html
├── edit-product.html
│
├── css/
│   └── style.css
│
└── js/
    ├── api.js
    ├── dashboard.js
    ├── products.js
    ├── add-product.js
    ├── edit-product.js
    └── toast.js
```

### Backend

```text
ProductFlow-Backend/
│
└── src/
    └── main/
        ├── java/
        │   └── com.product/
        │       ├── controller/
        │       ├── model/
        │       ├── repo/
        │       ├── service/
        │       └── ProductAppApplication.java
        │
        └── resources/
            └── application.properties
```

---

## 🔗 Frontend–Backend Integration

The frontend communicates with the Spring Boot backend using REST APIs.

### Backend Base URL

```text
http://localhost:8081/product
```

The frontend uses JavaScript `fetch()` requests to communicate with these APIs.

Example:

```text
GET /product/allproducts
```

returns all products from the MySQL database.

---

## 🔗 API Endpoints

| Method | Endpoint                                                  | Description                  |
| ------ | --------------------------------------------------------- | ---------------------------- |
| POST   | `/product/add`                                            | Add a product                |
| POST   | `/product/addAll`                                         | Add multiple products        |
| GET    | `/product/allproducts`                                    | Get all products             |
| GET    | `/product/id/{id}`                                        | Get product by ID            |
| PUT    | `/product/update/{id}`                                    | Update a product             |
| DELETE | `/product/delete/{id}`                                    | Delete a product             |
| GET    | `/product/search?keyword=pen`                             | Search products              |
| GET    | `/product/filter?min=100&max=5000`                        | Filter by price              |
| GET    | `/product/category-price?category=electronics&price=1000` | Filter by category and price |
| GET    | `/product/update-price?id=1&price=2000`                   | Update product price         |
| GET    | `/product/highpriceproduct`                               | Get highest-priced product   |
| GET    | `/product/countbycategory`                                | Count products by category   |

---

## 🗄️ Database

The backend uses **MySQL**.

Database:

```sql
CREATE DATABASE productdb;
```

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/productdb
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> Do not commit your actual database password to GitHub.

---

## ▶️ How to Run

### 1. Start the Backend

Open the backend project in **Spring Tool Suite**.

Configure MySQL credentials in:

```text
application.properties
```

Run the Spring Boot application.

Backend will start at:

```text
http://localhost:8081
```

### 2. Start the Frontend

Open the frontend project in **Visual Studio Code**.

Install/use the **Live Server** extension and open:

```text
index.html
```

The frontend will communicate with the backend running on port `8081`.

---

## 🧪 API Testing

Backend APIs can be tested using **Postman**.

Example:

```text
GET http://localhost:8081/product/allproducts
```

---

## 💡 Concepts Demonstrated

* Spring Boot
* REST API development
* Dependency Injection
* Spring Data JPA
* Hibernate
* JPQL
* CRUD operations
* Search and filtering
* Sorting
* Aggregation using `GROUP BY`
* Subqueries
* Bulk operations
* Exception handling
* CORS
* JavaScript Fetch API
* Frontend–backend integration
* MySQL database connectivity

---

## 📌 Project Architecture

```text
        ProductFlow Frontend
        HTML / CSS / JavaScript
                  │
                  │ REST API
                  ▼
        ProductFlow Backend
        Spring Boot / Java
                  │
                  │ JPA / Hibernate
                  ▼
              MySQL
```

---

## 👩‍💻 Author

**Devi Kontham**

B.Tech Computer Science Engineering
