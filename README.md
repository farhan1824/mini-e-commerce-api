# Mini E-Commerce Platform

A full-stack e-commerce application built with **React + Vite** (frontend) and **Express.js + MongoDB** (backend). This project includes user authentication with Firebase, product catalog management, shopping cart functionality, and order processing with role-based access control.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features Implemented](#features-implemented)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [How to Use](#how-to-use)

---

## 🎯 Project Overview

Mini E-Commerce is a complete e-commerce system demonstrating:

- **User Management**: Registration and authentication with Firebase
- **Role-Based Access Control**: Customer, Admin, and SuperUser roles
- **Product Management**: Full CRUD operations with inventory tracking
- **Shopping Cart**: Add/remove products with stock validation
- **Order Processing**: Place orders with automatic cart clearing
- **Admin Dashboard**: Manage products and view inventory
- **SuperUser Panel**: Control user roles and promotions

---

## 🛠️ Tech Stack

### Frontend

- **React 19** with Hooks
- **Vite** - Build tool with HMR
- **React Router v7** - Client-side routing
- **Firebase Authentication** - User authentication
- **TailwindCSS + DaisyUI** - Styling and components
- **Lottie React** - Animations
- **SweetAlert2** - User notifications

### Backend

- **Node.js + Express.js** - REST API server
- **MongoDB** - NoSQL database
- **CORS** - Cross-origin requests
- **Dotenv** - Environment configuration
- **Morgan** - HTTP logging

---

## ✅ Features Implemented

### Authentication & User Management

- ✅ User registration with email/password (Firebase)
- ✅ User login with Firebase authentication
- ✅ User profile management
- ✅ Photo URL and display name storage
- ✅ Three-tier role system: Customer, Admin, SuperUser
- ✅ Protected routes (PrivateRoute, SuperUserRoute)
- ✅ User logout with session clearing

### Product Management (Admin)

- ✅ Add new products with details (name, price, category, stock, images)
- ✅ Update product information
- ✅ Delete products
- ✅ Manage product inventory
- ✅ Filter products by category
- ✅ Retrieve products by ID or fetch all products
- ✅ Admin dashboard with product list and controls

### Customer Features

- ✅ Browse all products
- ✅ Filter products by category
- ✅ View detailed product information
- ✅ Add products to shopping cart
- ✅ View cart with aggregated product details
- ✅ Update cart item quantities (increment/decrement)
- ✅ Remove items from cart
- ✅ Stock validation before adding to cart
- ✅ Place orders from cart
- ✅ View order history
- ✅ Automatic cart clearing after order placement

### SuperUser Features

- ✅ View all registered users
- ✅ Search users by name or email
- ✅ Promote users to admin role
- ✅ Filter non-superuser accounts

### Frontend Pages

- ✅ **Home Page** - Hero section, category list, bestselling products, testimonials
- ✅ **Shop Page** - Browse all products with category filtering
- ✅ **Product Details** - View full product information with reviews
- ✅ **Cart Page** - Manage cart items and place orders
- ✅ **Registration Page** - Sign up new users
- ✅ **Profile Page** - View user information
- ✅ **Admin Dashboard** - Manage products with CRUD interface
- ✅ **SuperUser Panel** - Manage user roles

---

## 📁 Project Structure

```
mini-E-Commerce-Api-Plan/
├── Backend/
│   ├── index.js              # Express server with API endpoints
│   ├── package.json          # Backend dependencies
│   └── .env                  # Database credentials (not in repo)
├── src/
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   ├── pages/
│   │   ├── Home/             # Home page components
│   │   ├── Shop/             # Shop and product browsing
│   │   ├── Cart/             # Shopping cart
│   │   ├── LoginSignin/      # Registration page
│   │   ├── ProductDetails/   # Product detail views
│   │   ├── Profile/          # User profile and admin panel
│   │   └── Hooks/            # Custom hooks
│   ├── Firebase/
│   │   ├── Firebase.init.js  # Firebase configuration
│   │   └── Authentication/   # Auth context and providers
│   ├── Shared/               # Header and Footer components
│   ├── router/               # Route configuration
│   ├── Context/              # Context providers
│   └── utils/                # Utility functions
├── public/                   # Static assets
├── vite.config.js            # Vite configuration
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v16+ and npm
- MongoDB Atlas account (free tier available)
- Firebase project
- Git

### Backend Setup

1. **Navigate to Backend folder**

   ```bash
   cd Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in Backend directory

   ```env
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   ```

   To get MongoDB credentials:
   - Create account at [mongodb.com](https://www.mongodb.com)
   - Go to Database Access → Create a user
   - Go to Network Access → Add your IP
   - Copy connection string and extract username/password

4. **Start Backend Server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

### Frontend Setup

1. **Return to root directory**

   ```bash
   cd ..
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase** in `src/Firebase/Firebase.init.js`

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

   Get these from Firebase Console → Project Settings

4. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

---

## 🔌 API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products?category=electronics` - Filter by category
- `GET /products/:id` - Get product by ID
- `POST /products` - Add new product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)
- `PATCH /products/:id/stocks` - Update product stock (Admin only)

### Users

- `POST /users` - Register new user
- `GET /users` - Get all users
- `GET /users/:email` - Get user by email
- `PATCH /users/promote/:id` - Promote user to admin (SuperUser only)

### Cart

- `GET /cart` - Get all cart items
- `POST /cart` - Add item to cart
- `PATCH /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove item from cart
- `DELETE /cart` - Clear entire cart

### Orders

- `GET /orders` - Get all orders
- `POST /orders` - Place new order

---

## 💾 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  photoUrl: String,
  role: String (customer, admin, superuser),
  createdAt: Date
}
```

### Products Collection

```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  image: String (URL),
  category: String,
  stocks: Number,
  rating: Number,
  reviews: String,
  createdAt: Date
}
```

### Cart Collection

```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  quantity: Number,
  createdAt: Date
}
```

### Orders Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String (pending),
  createdAt: Date
}
```

### Testimonials Collection

```javascript
{
  _id: ObjectId,
  name: String,
  image: String,
  feedback: String,
  rating: Number,
  createdAt: Date
}
```

---

## 📖 How to Use

### For Customers

1. Visit homepage and register a new account
2. Browse products in Shop
3. View product details
4. Add items to cart
5. Proceed to checkout and place order
6. View order history in Profile

### For Admins

1. Login with admin credentials
2. Go to Admin Dashboard
3. Add/Edit/Delete products
4. Manage product inventory
5. Update stock quantities

### For SuperUsers

1. Access SuperUser Panel
2. View all registered users
3. Promote customers to admin role
4. Search users by name or email

---

## 🔐 Authentication Flow

1. User registers with email and password via Firebase
2. Firebase creates user account and issues authentication token
3. User data stored in MongoDB (email, name, role, photo)
4. On login, Firebase provides authentication token
5. Protected routes check user authentication status
6. Role-based access control prevents unauthorized actions

---

## ⚠️ Known Limitations

- No JWT token-based API authentication (uses Firebase for client-side auth)
{becuase i don't know JWT }
---

## 🚀 Future Enhancements

- Implement JWT authentication for API security
- Add stock deduction on order processing
- Implement order status management (pending → shipped → delivered)
- Add payment gateway integration or simulation
- Implement database transactions for data consistency
- Add fraud detection and prevention
- Enhance error handling and logging
- Implement rate limiting and CSRF protection
- Add user order history endpoint
- Implement order cancellation with limits

---

## 📝 Notes

This project is a demonstration of full-stack e-commerce development. It implements core features and can serve as a foundation for more advanced features like payment processing, advanced analytics, and real-time notifications.
