# eCommerce Platform API

## Overview
This is a backend program for an eCommerce platform that provides a Web API for user authentication, product management, and cart functionality.

## Features
- User authentication (registration, login, logout)
- Product management (CRUD operations)
- Cart functionality (add, remove, update items)

## Project Structure
```
ecommerce-platform
├── src
│   ├── controllers         # Contains controller classes for handling requests
│   ├── models              # Contains data models for users, products, and carts
│   ├── routes              # Contains route definitions for API endpoints
│   ├── services            # Contains business logic for authentication, products, and cart
│   ├── utils               # Contains utility functions
│   ├── app.ts              # Entry point of the application
│   └── types               # Contains TypeScript interfaces and types
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd ecommerce-platform
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## API Usage
### Authentication
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`

### Products
- **Get All Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/{id}`

### Cart
- **Add Item to Cart**: `POST /api/cart/add`
- **Remove Item from Cart**: `DELETE /api/cart/remove`
- **Update Item in Cart**: `PUT /api/cart/update`
- **Get Cart Details**: `GET /api/cart`

## Examples
Refer to the API documentation for detailed examples of requests and responses.

## License
This project is licensed under the MIT License.