# E-Commerce API

A comprehensive backend API for an e-commerce platform built with Node.js, Express, and MongoDB. The project is designed to manage various aspects of an online store, including user authentication, product management, orders, reviews, carts, coupons, categories, brands, addresses, and wishlists.
Additionally, the platform supports image upload and image processing to compress images, as well as integration with Stripe for payment processing.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Overview

This API provides a robust backend solution for an e-commerce application. It utilizes the Model-View-Controller (MVC) pattern to keep code organized and scalable. The application consists of multiple models, controllers, and routes that cover a range of functionalities from user management and product listings to order processing and review handling.

## Features

- **User Authentication & Authorization:**  
  Secure login, registration, and user management via authentication controllers and routes.

- **Product Management:**  
  Create, update, read, and delete products with detailed information such as price, description, images, and inventory.

- **Category & Sub-Category Management:**  
  Organize products by categories and sub-categories for better navigation and filtering.

- **Brand Management:**  
  Maintain a catalog of brands that are associated with products.

- **Cart & Wishlist:**  
  Manage user carts and wishlists to enhance the shopping experience.

- **Order Processing:**  
  Handle order placement, tracking, and history for users.

- **Coupon & Discounts:**  
  Apply coupon codes to orders for discounts and promotional offers.

- **Reviews & Ratings:**  
  Allow users to review products and provide ratings.

- **Address Management:**  
  Manage shipping and billing addresses for user orders.

## Project Structure

The project follows a modular structure

```
/project-root
├── config
│   └── dbConn.js
├── controllers
│   ├── addressesController.js
│   ├── authController.js
│   ├── brandController.js
│   ├── cartController.js
│   ├── categoryController.js
│   ├── couponController.js
│   ├── handlersFactory.js
│   ├── orderController.js
│   ├── productController.js
│   ├── reviewController.js
│   ├── subCategoryController.js
│   ├── userController.js
│   └── wishlistController.js
├── middleware
│   ├── errorMiddleware.js
│   ├── uploadImageMiddleware.js
│   └── validatorMiddleware.js
├── models
│   ├── brandModel.js
│   ├── cartModel.js
│   ├── categoryModel.js
│   ├── couponModel.js
│   ├── orderModel.js
│   ├── productModel.js
│   ├── reviewModel.js
│   ├── subCategoryModel.js
│   └── userModel.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── addressRoutes.js
│   ├── authRoutes.js
│   ├── brandRoutes.js
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── couponRoutes.js
│   ├── index.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   ├── reviewRoutes.js
│   ├── subCategoryRoutes.js
│   ├── userRoutes.js
│   └── wishlistRoutes.js
├── server.js
├── uploads
│   ├── brands
│   │   └── brand-ef338997-c0f4-40d3-acd8-48d498a1c8ab-1740398340984.jpeg
│   ├── categories
│   │   └── category-e5142813-9a17-4176-9c59-32389c213fcd-1740394199383.jpeg
│   └── products
│       └── product-f1bd1126-d264-4ee1-bbf9-2e052db04cc9-1740402442204-cover.jpeg
└── utils
    ├── apiError.js
    ├── apiFeatures.js
    ├── createToken.js
    ├── dummyData
    │   ├── products.json
    │   └── seeder.js
    ├── sendEmail.js
    └── validators
        ├── authValidator.js
        ├── brandValidator.js
        ├── categoryValidator.js
        ├── productValidator.js
        ├── reviewValidator.js
        ├── subCategoryValidator.js
        └── userValidator.js
```

---

- **config:** Contains configuration files such as the `dbConn.js`, which sets up and manages the database connection.

- **controllers:** Houses the business logic for handling requests. This includes controllers for addresses, authentication, brands, carts, categories, coupons, orders, products, reviews, sub-categories, users, and wishlists.

- **middleware:** Provides functions that intercept the request/response cycle. It includes error handling (`errorMiddleware.js`), image upload processing (`uploadImageMiddleware.js`), and request validation (`validatorMiddleware.js`).

- **models:** Defines the data structures for the application. This directory includes schemas for orders, users, reviews, categories, sub-categories, coupons, brands, carts, and products.

- **routes:** Maps API endpoints to the corresponding controller functions. Endpoints cover areas such as addresses, authentication, brands, carts, categories, coupons, orders, products, reviews, sub-categories, users, and wishlists.

- **uploads:** Stores static assets like images for brands, categories, and products. This directory is used for serving uploaded media content.

- **utils:** Contains various utility functions and helpers used across the application. These include API error handling (`apiError.js`), API features (e.g., filtering and sorting via `apiFeatures.js`), token creation (`createToken.js`), email sending (`sendEmail.js`), and data validators. Additionally, the `dummyData` folder holds files for seeding the database.

---

## Installation

1. **Clone the Repository**

    ```bash
    git clone git@github.com:GergesHany/InternIntelligence_E-COMMERCE.git
    cd InternIntelligence_E-COMMERCE
    ```

2. **Install Dependencies**

   Ensure you have Node.js installed. Then, install the project dependencies:

    ```bash
    npm install
    ```

3. **Setup Environment Variables**

   Create a `.env` file in the project root and configure the necessary environment variables (see [Environment Variables](#environment-variables) below).

4. **Start the Application**

    ```bash
     nodemon server.js
    ```

The API will typically run on [http://localhost:8000](http://localhost:8000) unless otherwise configured.

---

## Environment Variables

The application uses environment variables for configuration. Below is an example of what you might include in your .env file:

```bash
PORT=3000
DATABASE_URI=mongodb://localhost:27017/ecommerceDB
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

- PORT: The port number the server will listen on.
- DATABASE_URI: MongoDB connection string.
- JWT_SECRET: Secret key for signing JSON Web Tokens.
- JWT_EXPIRES_IN: Token expiration duration.
- NODE_ENV: Application environment (development, production, etc.).


## API Endpoints


## Address Routes

**File:** `addressRoutes.js`

- **GET** `/api/addresses` Retrieve all addresses for the authenticated user.
- **POST** `/api/addresses`  Add a new address for the authenticated user.
- **DELETE** `/api/addresses/:id` Delete a specific address.
---

## Auth Routes

**File:** `authRoutes.js`

- **POST** `/api/auth/signup` Register a new user.
- **POST** `/api/auth/login` Log in an existing user.
- **POST** `/api/auth/forgotPassword` Request a password reset link.
- **PUT** `/api/auth/resetPassword/` Reset a user’s password
- **POST** `/api/auth/verifyResetCode` Verify a password reset code.

---

## Brand Routes

**File:** `brandRoutes.js`

- **GET** `/api/brands` Retrieve all brands.
- **GET** `/api/brands/:id` Retrieve a specific brand by ID.
- **POST** `/api/brands` Create a new brand.
- **PUT** `/api/brands/:id` Update an existing brand.
- **DELETE** `/api/brands/:id` Delete a brand by ID.

---

## Cart Routes

**File:** `cartRoutes.js`

- **GET** `/api/cart` Retrieve the authenticated user’s cart.
- **POST** `/api/cart` Add an item to the user’s cart.
- **PATCH** `/api/cart/:itemId` Update the quantity of a specific item in the cart.
- **DELETE** `/api/cart/:itemId` Remove an item from the cart.
- **DELETE** `/api/cart`  Clear the entire cart.

---

## Category Routes

**File:** `categoryRoutes.js

`
- **GET** `/api/categories` Retrieve all categories.
- **GET** `/api/categories/:id` Retrieve a specific category by ID.
- **POST** `/api/categories` Create a new category.
- **PUT** `/api/categories/:id` Update an existing category.
- **DELETE** `/api/categories/:id` Delete a category by ID.
- **GET** `/api/categories/:id/subcategories` Retrieve all sub-categories for a specific category.

---

## Coupon Routes

**File:** `couponRoutes.js`

- **GET** `/api/coupons` Retrieve all coupons.
- **GET** `/api/coupons/:id` Retrieve a specific coupon by ID.
- **POST** `/api/coupons` Create a new coupon.
- **PUT** `/api/coupons/:id` Update an existing coupon.
- **DELETE** `/api/coupons/:id` Delete a coupon by ID.

---

## Order Routes

**File:** `orderRoutes.js`

- **GET** `/api/orders/checkout-session/:cartId` Initiates a checkout session for the specified cart (requires user role).
- **POST** `/api/orders/:cartId` Creates a cash order based on the specified cart (requires user role).
- **GET** `/api/orders` Retrieves all orders (for regular users, only their own orders; admins and managers can view all orders).
- **GET** `/api/orders/:id` Retrieves details of a specific order by its ID.
- **PUT** `/api/orders/:id/pay` Marks an order as paid (restricted to admin and manager roles).
- **PUT** `/api/orders/:id/deliver` Marks an order as delivered (restricted to admin and manager roles).


---

## Product Routes

**File:** `productRoutes.js`

- **GET** `/api/products` Retrieves all products.
- **POST** `/api/products` Creates a new product (requires admin or manager role; includes image upload, image resizing, and product validation).
- **GET** `/api/products/:id` Retrieves details of a specific product by its ID (with product validation).
- **PUT** `/api/products/:id` Updates an existing product (requires admin or manager role; includes image upload, image resizing, and update validation).
- **DELETE** `/api/products/:id` Deletes a specific product (restricted to admin role; validated before deletion).
- **Product Reviews Sub-Routes** Routes for handling reviews related to a specific product are available under:  
   - **GET/POST** `/api/products/:productId/reviews`  
  - **GET** `/api/products/:productId/reviews/:reviewId`

---

## Review Routes

**File:** `reviewRoutes.js`

- **GET** `/api/reviews`  Retrieve all reviews (support product-based filtering).
- **GET** `/api/reviews/:id`  Retrieve a specific review by ID.
- **POST** `/api/reviews` Create a new review (requires a valid product ID and an authenticated user).
- **PUT** `/api/reviews/:id` Update an existing review (owner or admin).
- **DELETE** `/api/reviews/:id` Delete a review by ID (owner or admin).

---

## Sub-Category Routes

**File:** `subCategoryRoutes.js`

- **POST** `/api/subcategories`  
  Creates a new sub-category (requires admin or manager role; sets the category ID from the parent route and validates the request).
- **GET** `/api/subcategories` Retrieves all sub-categories (with optional filtering based on query parameters).
- **GET** `/api/subcategories/:id` Retrieves details of a specific sub-category by its ID (with request validation).
- **PUT** `/api/subcategories/:id` Updates an existing sub-category (requires admin or manager role; validated request).
- **DELETE** `/api/subcategories/:id` Deletes a specific sub-category (restricted to admin role; validated request).

---

## User Routes

**File:** `userRoutes.js`

- **GET** `/api/users/getMe` Retrieves the logged-in user’s data.
- **PUT** `/api/users/changeMyPassword` Updates the logged-in user’s password.
- **PUT** `/api/users/updateMe` Updates details of the logged-in user (requires validation).
- **DELETE** `/api/users/deleteMe` Deletes the logged-in user’s account.

---

*Admin & Manager Endpoints:*

- **PUT** `/api/users/changePassword/:id` Changes the password of a user specified by ID (requires admin or manager role).
- **GET** `/api/users` Retrieves a list of all users (accessible by admin and manager).
- **POST** `/api/users` Creates a new user (includes image upload/resizing and validation; accessible by admin and manager).
- **GET** `/api/users/:id` Retrieves details of a specific user by ID (with validation).
- **PUT** `/api/users/:id` Updates a specific user’s details (includes image upload/resizing and validation; accessible by admin and manager).
- **DELETE** `/api/users/:id` Deletes a specific user by ID (requires validation; accessible by admin and manager).

---

## Wishlist Routes

**File:** `wishlistRoutes.js`

- **GET** `/api/wishlist` Retrieve the authenticated user’s wishlist.
- **POST** `/api/wishlist` Add a product to the wishlist.
- **DELETE** `/api/wishlist/:productId` Remove a product from the wishlist.

---

