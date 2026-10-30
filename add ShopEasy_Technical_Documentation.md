# ShopEasy – Full-Stack E-Commerce Web Application
## Complete Technical Documentation

**Project Type:** Full-Stack Web Application  
**Frontend:** React.js, JavaScript, HTML5, CSS3, Vite  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**Authentication:** JWT and bcrypt  
**API Integration:** REST APIs and DummyJSON  
**API Testing:** Postman  
**Developer:** Madhu K.

---

# 1. Project Overview

## 1.1 What is ShopEasy?

ShopEasy is a full-stack e-commerce web application that allows users to browse products, view product details, add products to a shopping cart, register or log in, place orders, and view their order history.

The application follows a client-server architecture. The frontend handles the user interface and user interactions, while the backend handles API requests, authentication, business logic, and database operations.

The application integrates an external product API for product information and uses PostgreSQL to store user accounts, orders, and order items.

## 1.2 Main Objectives

The primary objectives of ShopEasy are:

- To build a responsive and user-friendly shopping interface.
- To implement reusable React components.
- To connect the frontend with backend REST APIs.
- To implement user registration and login.
- To protect user-specific endpoints using JWT authentication.
- To manage shopping cart items and quantities.
- To store order information in PostgreSQL.
- To display order history in the user's profile.
- To practise full-stack development using modern web technologies.

## 1.3 Major Features

1. Product browsing and product details.
2. Product search and category-based browsing.
3. User registration and login.
4. Authentication and protected API requests.
5. Shopping cart management.
6. Checkout and delivery information.
7. Order creation and database storage.
8. User profile and order history.
9. Responsive desktop and mobile navigation.
10. External product API integration.

---

# 2. Technologies Used and How They Work

## 2.1 Frontend Technologies

### HTML5

HTML provides the structure of the webpage.

For example, product information can be displayed using headings, images, paragraphs, and buttons.

```html
<h2>Wireless Headphones</h2>
<img src="product-image.jpg" alt="Headphones" />
<p>Price: ₹2,000</p>
<button>Add to Cart</button>
```

In ShopEasy, React components generate this HTML structure through JSX.

### CSS3

CSS controls the appearance and layout of the application.

It is used for:

- Colours, fonts, and spacing.
- Product cards and product grids.
- Navigation bars and buttons.
- Responsive layouts.
- Mobile navigation.
- Hover effects and transitions.
- Checkout and profile layouts.

For example, Flexbox and Grid help arrange product cards and align header buttons.

### JavaScript

JavaScript provides the application logic.

It handles events, form validation, API requests, array operations, calculations, and state updates.

For example, when a user clicks Add to Cart, JavaScript calls the cart function and updates the cart state.

### React.js

React is a JavaScript library for building user interfaces from reusable components.

Instead of writing an entire webpage as one large file, React allows us to divide the interface into smaller components.

Examples in ShopEasy include:

- Header
- Footer
- ProductCard
- ProductGrid
- ProductDetails
- Cart
- Checkout
- Profile

React uses state and props to manage data and update the interface when that data changes.

### Vite

Vite is the frontend development and build tool.

It provides a development server, fast updates during development, and a production build.

Common commands:

```bash
npm run dev
npm run build
```

The first starts the development server. The second creates an optimized production build when configured in the frontend's `package.json`.

### React Router

React Router handles navigation between pages without requiring a complete browser-page reload for every route change.

Examples:

| URL | Page |
|---|---|
| `/` | Home |
| `/products` | Products |
| `/products/12` | Product details for ID 12 |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/login` | Login |
| `/signup` | Registration |
| `/profile` | User profile |
| `/order-success` | Order success |

The exact routes depend on the application's route configuration.

The `useParams()` hook retrieves route parameters. For example, on `/products/12`, it can return an `id` value of `"12"`.

### React Context API

Context allows components to access shared state without passing props manually through every intermediate component.

ShopEasy uses contexts for shared application data, particularly:

- `AuthContext`: user information, authentication, login, registration, and logout.
- `CartContext`: cart items, quantities, totals, and cart operations.
- `ProductsContext`: shared product data where implemented.

---

## 2.2 Backend Technologies

### Node.js

Node.js is the JavaScript runtime used to execute JavaScript outside the browser.

In ShopEasy, Node.js runs the backend server, handles incoming HTTP requests, executes application logic, and communicates with PostgreSQL and external APIs.

### Express.js

Express.js is a web framework for Node.js.

It simplifies the process of defining API endpoints, applying middleware, reading request data, and sending HTTP responses.

For example:

```javascript
app.get('/', (req, res) => {
  res.json({
    message: 'ShopEasy API is running',
  })
})
```

When a client sends a GET request to the root endpoint, Express sends a JSON response.

### PostgreSQL

PostgreSQL is a relational database management system.

ShopEasy uses it to persist data such as:

- User accounts.
- Orders.
- Individual items belonging to orders.
- Delivery information captured for orders.
- Order totals and statuses.

A relational database stores structured information in tables and connects related records using keys.

### `pg` — PostgreSQL Client

The Node.js `pg` package allows the backend to execute SQL queries against PostgreSQL.

The database configuration typically creates a connection pool.

A pool reuses database connections rather than opening a completely new connection for every query.

Example:

```javascript
const { Pool } = require('pg')

const pool = new Pool({
  // Read connection settings from environment variables.
})

module.exports = pool
```

The real configuration should use the application's existing environment variables.

### bcrypt

bcrypt is used to hash passwords before storing them in the database.

Instead of saving a user's original password, the backend stores its hash.

During login, bcrypt compares the submitted password against the stored hash.

### JSON Web Token (JWT)

JWT provides a way to represent authenticated identity in a signed token.

After a successful login, the backend can create a token containing the user's ID and an expiration time.

The frontend sends this token with requests to protected endpoints.

The backend verifies the token before allowing access.

### dotenv

The `dotenv` package loads environment variables from a local `.env` file during development.

These variables can include database credentials, a JWT secret, and the backend port.

Sensitive values should not be committed to GitHub.

### CORS

Cross-Origin Resource Sharing (CORS) controls whether browsers are allowed to make cross-origin requests.

For example, the frontend might run on `http://localhost:5173` while the backend runs on `http://localhost:5001`.

Because these are different origins, the backend must allow the intended frontend origin.

For production, CORS should be configured for the actual deployed frontend rather than allowing every origin indiscriminately.

### External Product API

ShopEasy uses DummyJSON for product information.

The frontend or backend can request product data from the external service, depending on the implemented product-service functions.

Product data may include the product ID, title, description, price, category, rating, and images.

The application's product service maps the API response into the fields used by React components.

---

# 3. Project Architecture

ShopEasy follows a layered client-server architecture.

```text
                  USER
                    |
                    v
           REACT FRONTEND
                    |
        +-----------+-----------+
        |                       |
        v                       v
   React Router             React Context
   Page Navigation          Shared State
        |                       |
        +-----------+-----------+
                    |
                    v
             Service Layer
         HTTP Requests / fetch
                    |
                    v
             EXPRESS SERVER
                    |
                    v
               Middleware
       JSON Parsing / Authentication
                    |
                    v
                API Routes
                    |
                    v
                Controllers
          Business Logic and Validation
                    |
          +---------+---------+
          |                   |
          v                   v
      PostgreSQL          External API
      Database            Product Data
```

## 3.1 How the Architecture Works

1. The user interacts with the React interface.
2. React handles the event and updates local or shared state.
3. If server data is needed, a service function sends an HTTP request.
4. Express receives the request.
5. Middleware parses the request and performs required checks.
6. The appropriate route directs the request to a controller.
7. The controller validates input and executes the business logic.
8. The backend queries PostgreSQL or calls an external API.
9. The backend sends an HTTP response, usually in JSON format.
10. The frontend processes the response and updates its state.
11. React renders the updated interface.

Not every user interaction requires a backend request. For example, changing a cart quantity can update React state locally, while placing an order requires a backend request and database persistence.

---

# 4. Frontend Folder Structure

The following is a representative structure based on the ShopEasy implementation. Some components or files may be organized differently in the actual repository.

```text
src/
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── ProductCard/
│   └── Other reusable components/
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ProductsContext.jsx
│
├── pages/
│   ├── Home/
│   ├── Products/
│   ├── ProductDetails/
│   ├── Categories/
│   ├── Offers/
│   ├── About/
│   ├── Login/
│   ├── SignUp/
│   ├── Cart/
│   ├── Checkout/
│   ├── OrderSuccess/
│   └── Profile/
│
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── orders.js
│   └── productService.js
│
├── utils/
├── App.jsx
└── main.jsx
```

## 4.1 Components Folder

The components folder contains reusable interface elements.

### Header

The Header component displays the logo, navigation links, authentication controls, search navigation, and cart indicator.

It uses React Router's navigation and link components to move between pages.

It also uses `CartContext` to display the cart item count and `AuthContext` to display Login, Sign Up, My Profile, or Logout depending on the authentication state.

When the cart changes, the cart count can update because the Header subscribes to the shared cart context.

### Footer

The Footer component displays common information at the bottom of pages.

It is reusable, so it does not need to be separately implemented on every page.

### ProductCard

ProductCard displays a single product in a reusable format.

It may show:

- Product image.
- Product name.
- Price.
- Rating.
- Discount information.
- Link to product details.
- Shopping or wishlist controls, if implemented.

The parent component passes the product to ProductCard through props.

Example:

```jsx
<ProductCard product={item} />
```

Here, `product` is a prop containing the selected product object.

ProductCard uses that object to render the correct information.

## 4.2 Pages Folder

The pages folder contains route-level screens.

### Home

The landing page introduces the store and provides navigation to products and shopping categories.

### Products

Displays a collection of products.

It may include search, sorting, category filters, rating filters, and price filters, depending on the implemented features.

### ProductDetails

Displays information about a single product.

It uses `useParams()` to read the product ID from the URL and calls `getProductById(id)` to retrieve product details.

For example, `/products/12` causes the page to request the product with ID 12.

The component uses React state to store:

- The selected product.
- The selected image.
- Loading status.
- Error status.

It can also display related products from the shared product list.

The Add to Cart button calls the `addToCart(product)` function from `CartContext`.

### Categories

Displays product categories or category-based browsing options.

### Offers

Displays discounted or promotional products, depending on the implemented logic.

### About

Provides information about the ShopEasy application.

### Login

Collects login credentials and calls the authentication service.

If the login succeeds, the application stores the returned token and user information through `AuthContext`.

### SignUp

Collects registration information and sends it to the backend.

The backend validates the input, hashes the password, and creates a user account.

### Cart

Displays products added to the shopping cart.

It reads `cartItems` from `CartContext` and provides controls to update quantities or remove items.

### Checkout

Collects customer and delivery information, validates the fields, and submits the order request.

The checkout page should require authentication if the order API is protected.

### OrderSuccess

Displays confirmation after a successful order submission.

It may use route state or another mechanism to display the order information returned by checkout.

### Profile

Displays account information, delivery details, and the user's order history.

The profile page requests order data from the protected `/api/orders` endpoint using the authentication token.

---

# 5. React Context: Managing Shared Data

React Context is important because several components need access to the same data.

## 5.1 AuthContext

AuthContext manages the authentication state.

Typical responsibilities include:

- Storing the current user in React state.
- Registering a new user.
- Logging in a user.
- Restoring a session when the application starts.
- Logging out.
- Making user information available to other components.

### Login Workflow

1. The user enters an email and password.
2. The Login page calls the login function from AuthContext.
3. AuthContext calls the authentication service.
4. The service sends a POST request to `/api/auth/login`.
5. The backend looks up the user and compares the password using bcrypt.
6. If valid, the backend creates a JWT and returns the token and user information.
7. The frontend saves the token and updates the current user state.
8. Components that depend on authentication update accordingly.

### Session Restoration

When the application starts, AuthContext can check local storage for a saved token.

If a token exists, it requests the current user through `/api/auth/me`.

If the token is valid, the frontend restores the user state.

If it is invalid or expired, the frontend should remove the unusable token and treat the user as logged out.

A saved token is not proof of validity by itself; the backend must verify it.

## 5.2 CartContext

CartContext manages the shopping cart across pages.

Its important values and functions include:

| Name | Purpose |
|---|---|
| `cartItems` | Array of cart products |
| `addToCart()` | Adds a product or increases its quantity |
| `removeFromCart()` | Removes a product |
| `increaseQuantity()` | Increases quantity |
| `decreaseQuantity()` | Decreases quantity |
| `clearCart()` | Removes all items |
| `cartItemCount` | Total number of units in the cart |
| `cartTotal` | Sum of product prices multiplied by quantities |

### How Add to Cart Works

Suppose a user adds a product with ID 12.

The `addToCart()` function checks whether the cart already contains a product with the same ID.

- If it exists, the quantity increases by one.
- If it does not exist, the product is added with quantity 1.

The cart is stored in React state, allowing components to update immediately.

The application also saves the cart in local storage so it can restore it after a browser refresh.

### Example Cart Data

```json
[
  {
    "id": 12,
    "name": "Wireless Headphones",
    "price": 2000,
    "quantity": 2
  }
]
```

This example illustrates the data structure; the actual product fields depend on the external API and product-service mapping.

### Important Currency Consideration

The external product API provides prices in USD. If the interface displays INR, the conversion must be applied consistently.

The application should not convert the same price twice. It should also ensure that the backend independently calculates trusted order prices rather than accepting arbitrary prices from the browser.

## 5.3 ProductsContext

ProductsContext can share product data between components.

For example, the Products page, Header, and ProductDetails page may need access to product data.

Instead of requesting or passing the same collection repeatedly, a shared context can provide it to multiple components.

The exact behaviour depends on how `ProductsContext.jsx` is implemented.

---

# 6. How Frontend and Backend Are Connected

The frontend and backend communicate using HTTP requests and responses.

For local development, ShopEasy uses a backend running on port 5001.

A typical configuration is:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5001
```

The frontend service layer calls URLs such as:

```text
http://localhost:5001/api/auth/login
http://localhost:5001/api/auth/register
http://localhost:5001/api/auth/me
http://localhost:5001/api/orders
```

The actual frontend port may differ depending on Vite's configuration.

## 6.1 What Is an API?

An API is an interface that allows two software systems to communicate.

In ShopEasy, the frontend does not directly access PostgreSQL.

Instead, the frontend sends a request to the Express backend. The backend processes the request, interacts with the database, and returns a response.

This separation keeps database credentials on the server rather than exposing them in the browser.

## 6.2 What Is a REST API?

A REST API exposes resources through URLs and uses HTTP methods to perform operations.

Common methods include:

- `GET`: retrieve information.
- `POST`: create a resource or submit data.
- `PUT`: replace or update a resource.
- `PATCH`: partially update a resource.
- `DELETE`: remove a resource.

Examples in ShopEasy:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/orders
POST /api/orders
```

These are examples of the application's API routes.

## 6.3 Frontend Service Layer

The service layer separates HTTP communication from UI components.

For example, an authentication service can define a login function.

```javascript
export const loginUserApi = async credentials => {
  const response = await fetch(
    'http://localhost:5001/api/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Login failed')
  }

  return data
}
```

This is an illustrative example of the request pattern; use the existing service implementation in the project.

The function sends the email and password as JSON.

The `Content-Type` header tells the backend how to interpret the request body.

`JSON.stringify()` converts the JavaScript object into JSON text.

`response.json()` parses the JSON response from the server.

`response.ok` indicates whether the HTTP response status is in the successful range.

## 6.4 Why Use a Service Layer?

Without a service layer, components would contain repeated HTTP request logic.

A service layer provides:

- Reusable API functions.
- Centralized backend URLs.
- Consistent error handling.
- Easier maintenance.
- Cleaner React components.

For example, Login calls `loginUserApi()` rather than manually implementing the entire HTTP request inside the component.

---

# 7. Backend Folder Structure

A representative backend structure is:

```text
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── orderController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── orderRoutes.js
├── .env
├── package.json
└── server.js
```

## 7.1 server.js — Entry Point

The server file starts the Express application and configures the global middleware and API routes.

A simplified example is:

```javascript
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`ShopEasy server running on port ${PORT}`)
})
```

### How It Works

1. Express creates the application.
2. dotenv loads environment variables.
3. CORS is configured.
4. JSON parsing middleware is registered.
5. Authentication routes are mounted at `/api/auth`.
6. Order routes are mounted at `/api/orders`.
7. The server starts listening on the configured port.

When the browser sends a request to `/api/orders`, Express directs it to the order router.

## 7.2 config/db.js — Database Configuration

This file creates and exports the PostgreSQL connection pool.

The controllers use the pool to run database queries.

Example:

```javascript
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

module.exports = pool
```

The environment variable names must match the application's configuration.

The password and other sensitive values should remain in the server's environment, not in source code committed to GitHub.

## 7.3 routes — Endpoint Definitions

Routes define which HTTP methods and URLs are available and which controller functions handle them.

For example:

```javascript
router.post('/login', loginUser)
```

When a POST request reaches `/api/auth/login`, Express invokes `loginUser`.

The route itself generally defines the endpoint and any middleware required before the controller runs.

## 7.4 controllers — Application Logic

Controllers process requests.

They typically:

1. Read request parameters and body data.
2. Validate the input.
3. Apply business rules.
4. Query or update the database.
5. Handle expected errors.
6. Return an HTTP response.

Authentication controllers handle registration and login. Order controllers handle order creation and retrieval.

Keeping controller logic separate from route definitions makes the backend easier to maintain.

---

# 8. Middleware: What It Is and How It Works

Middleware is one of the most important concepts in the ShopEasy backend.

## 8.1 Definition

Middleware is a function that runs during the request-response lifecycle.

It can inspect or modify the request, perform checks, log information, handle errors, or decide whether processing should continue.

Express middleware commonly receives:

```javascript
(req, res, next)
```

Where:

- `req` is the request object.
- `res` is the response object.
- `next` passes control to the next middleware or handler.

## 8.2 JSON Parsing Middleware

ShopEasy uses:

```javascript
app.use(express.json())
```

Suppose the frontend sends:

```json
{
  "email": "user@example.com",
  "password": "example-password"
}
```

The browser sends JSON text in the HTTP request body.

`express.json()` parses supported JSON request bodies and makes the resulting object available as `req.body`.

Without the appropriate body parser, a controller may not receive the request data in the expected format.

## 8.3 CORS Middleware

ShopEasy uses CORS middleware to configure cross-origin requests.

```javascript
app.use(cors())
```

This example allows broad cross-origin access under the package's default configuration. For deployment, it is better to restrict allowed origins to the intended frontend.

CORS is a browser access policy. It is not authentication and does not prevent a non-browser client from calling an API directly.

## 8.4 Authentication Middleware

The authentication middleware protects routes that require a logged-in user.

For example, the orders route may use:

```javascript
router.get('/', authMiddleware, getMyOrders)
```

The middleware runs before `getMyOrders`.

### Authentication Middleware Workflow

1. The frontend sends a request to a protected endpoint.
2. It includes the JWT in the `Authorization` header.
3. The middleware reads the header.
4. It checks for a Bearer token.
5. It verifies the token using the server's JWT secret.
6. It extracts the authenticated user's ID.
7. It attaches the ID to the request, commonly as `req.user`.
8. It calls `next()` if verification succeeds.
9. If the token is missing or invalid, it returns an appropriate error response.

Example header:

```http
Authorization: Bearer eyJhbGciOi...
```

Illustrative middleware:

```javascript
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication required',
    })
  }

  const token = authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    )

    req.user = {
      id: decoded.id,
    }

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    })
  }
}

module.exports = authMiddleware
```

This illustrates the middleware pattern used in ShopEasy; the actual implementation should remain consistent with the token payload created by the authentication controller.

### Why Is `req.user` Important?

After verification, the backend needs to know which user is making the request.

The middleware places the verified user ID in `req.user`.

The order controller can then use:

```javascript
const userId = req.user.id
```

This allows the controller to retrieve orders belonging to the authenticated user.

The backend must not trust a user ID supplied by the browser to decide whose private orders should be returned.

## 8.5 Is Authentication Middleware the Same as Authorization?

No.

**Authentication** answers: “Who is making this request?”

**Authorization** answers: “Is this user allowed to perform this operation?”

A valid JWT establishes the identity represented by the token. The backend must still enforce ownership and any other access-control rules.

For example, a user should only be able to view their own order history, not another user's orders.

## 8.6 Error-Handling Middleware

Express can use dedicated error-handling middleware to centralize unexpected errors.

It typically receives four arguments:

```javascript
(err, req, res, next)
```

A centralized handler can log the error and return a consistent response.

The exact error-handling middleware depends on the backend implementation. If a project does not register a dedicated error handler, individual controllers may handle errors with `try/catch` blocks.

---

# 9. Complete Request Lifecycle

When a request is sent from the browser, it follows a series of stages.

For example, consider a request to retrieve the user's orders.

```text
User opens Profile page
          |
          v
Profile component executes
          |
          v
Frontend service sends GET /api/orders
          |
          v
Express receives HTTP request
          |
          v
Global middleware processes request
          |
          v
Order router matches GET /
          |
          v
Authentication middleware verifies JWT
          |
          +---- Invalid token --> 401 response
          |
          v
getMyOrders controller executes
          |
          v
PostgreSQL query filters by user ID
          |
          v
Controller formats order data
          |
          v
Express returns JSON response
          |
          v
Frontend updates orders state
          |
          v
React renders order history
```

## 9.1 HTTP Request

The browser sends information such as:

- HTTP method.
- URL.
- Headers.
- Optional request body.

For a GET request, the browser typically does not need a request body.

For a POST request such as login or order creation, the body can contain JSON data.

## 9.2 Middleware Processing

Express runs the middleware registered for the request in the relevant order.

Middleware may parse JSON, apply CORS rules, verify authentication, or perform other checks.

## 9.3 Route Matching

The router matches the request method and URL to a defined endpoint.

For example:

```javascript
router.post('/register', registerUser)
```

When mounted at `/api/auth`, this endpoint becomes:

```text
POST /api/auth/register
```

## 9.4 Controller Processing

The controller performs the required application logic.

It can query PostgreSQL, call an external service, or validate information before changing stored data.

## 9.5 Response

The backend returns an HTTP status code and usually a JSON body.

Examples:

- `200 OK`: a request completed successfully.
- `201 Created`: a resource was created.
- `400 Bad Request`: the request contains invalid input.
- `401 Unauthorized`: authentication is missing or invalid.
- `403 Forbidden`: the user is authenticated but lacks permission.
- `404 Not Found`: the requested resource does not exist.
- `500 Internal Server Error`: an unexpected server error occurred.

The exact status code should reflect the actual result.

## 9.6 Frontend Response Handling

The frontend receives the response, checks whether it succeeded, and updates its state.

If the request fails, the interface should display a helpful message instead of silently showing incorrect or empty data.

---

# 10. Authentication: Registration and Login

## 10.1 Registration Workflow

The registration process creates a user account.

1. The user enters their name, email, and password.
2. The frontend validates the fields.
3. The registration service sends a POST request to `/api/auth/register`.
4. Express parses the JSON body.
5. The authentication controller validates the input.
6. The controller checks whether the email is already registered.
7. bcrypt hashes the password.
8. The backend inserts the user into PostgreSQL.
9. The backend may create a JWT and return the user and token.
10. The frontend stores the token and updates authentication state if registration automatically signs the user in.

The password should never be stored as plain text.

## 10.2 Login Workflow

1. The user enters their email and password.
2. The frontend sends a POST request to `/api/auth/login`.
3. The backend finds the user by email.
4. bcrypt compares the submitted password against the stored hash.
5. If the credentials are valid, the backend signs a JWT.
6. The backend returns the token and user information.
7. The frontend saves the token and updates AuthContext.
8. The user can access authenticated features.

## 10.3 How JWT Works

A JWT is a signed token containing claims.

A simplified payload might contain:

```json
{
  "id": 15
}
```

The actual token also includes a header and signature, and it may include an expiration claim.

The backend signs the token using a secret or signing key. Later, the authentication middleware verifies the signature and token validity.

A JWT is generally encoded rather than encrypted. Sensitive information such as passwords must not be placed in its payload.

## 10.4 Logout

Logout removes the stored token and clears the user state in the frontend.

After logout, protected requests should no longer be sent using that removed token.

Removing a token from the browser does not automatically invalidate a copied JWT on the server. Applications that need immediate server-side revocation require an additional strategy, such as token revocation or short-lived access tokens.

---

# 11. PostgreSQL Database Design

ShopEasy uses relational tables to store structured application data.

## 11.1 Users Table

The users table stores account information.

Representative fields:

| Column | Purpose |
|---|---|
| `id` | Unique user identifier |
| `name` | User's name |
| `email` | User's email address |
| `password` | Stored password hash |
| `created_at` | Account creation timestamp |

The ID is used to identify the account and associate its orders with the correct user.

## 11.2 Orders Table

The orders table stores order-level information.

Representative fields include:

| Column | Purpose |
|---|---|
| `id` | Unique order ID |
| `user_id` | Owner of the order |
| `first_name` | Customer's first name |
| `last_name` | Customer's last name |
| `email` | Contact email |
| `phone` | Contact phone |
| `address` | Delivery address |
| `city` | Delivery city |
| `state` | Delivery state |
| `pincode` | Postal PIN code |
| `subtotal` | Order subtotal |
| `shipping` | Shipping charge |
| `total` | Final order total |
| `payment_method` | Selected payment method |
| `payment_status` | Payment status |
| `order_status` | Order status |
| `created_at` | Order creation timestamp |

The `user_id` column associates an order with its owner.

## 11.3 Order Items Table

An order can contain multiple products, so its individual items are stored separately.

Representative fields:

| Column | Purpose |
|---|---|
| `id` | Unique order-item row ID |
| `order_id` | Parent order ID |
| `product_id` | Product ID from the product source |
| `product_name` | Product name saved with the order |
| `product_image` | Product image |
| `quantity` | Number of units ordered |
| `unit_price` | Price per unit |
| `line_total` | Quantity multiplied by unit price |

Storing the product name and price at order time helps preserve the order record even if the external product listing changes later.

## 11.4 Relationships

The database has two important relationships:

- One user can have multiple orders.
- One order can have multiple order items.

```text
users
  |
  | users.id
  v
orders.user_id
  |
  | orders.id
  v
order_items.order_id
```

The relevant foreign keys and column types should be configured consistently in the database schema.

## 11.5 SQL Queries

The backend uses SQL to insert, retrieve, and update data.

Example:

```sql
SELECT *
FROM orders
WHERE user_id = $1
ORDER BY created_at DESC;
```

The `$1` is a parameter placeholder. The backend supplies the user ID separately through the query parameters.

Parameterized queries help prevent SQL injection when used correctly.

The controller should obtain the user ID from the verified authentication context, not blindly accept it from the client.

## 11.6 Database Connection Pool

A connection pool manages reusable database connections.

Instead of opening a new connection for every query, the application can acquire a connection from the pool.

This improves resource management and helps the server handle multiple requests.

## 11.7 Database Transactions

Creating an order often requires inserting an order row and multiple order-item rows.

These operations should be handled in a database transaction.

The transaction pattern is:

1. Begin a transaction.
2. Insert the order.
3. Insert each order item.
4. Commit if all operations succeed.
5. Roll back if an operation fails.

A transaction prevents the database from retaining a partially created order when one of the required insertions fails.

With `pg`, transaction operations should use the same checked-out client connection.

---

# 12. Complete Checkout and Order Creation Workflow

This is one of the most important parts of ShopEasy because it combines React, APIs, authentication, backend logic, and PostgreSQL.

## 12.1 Step 1: Add Products to Cart

The user opens a product and clicks Add to Cart.

ProductDetails calls:

```javascript
addToCart(product)
```

CartContext checks whether the product already exists in the cart.

It then adds the product or increases its quantity and persists the cart to local storage.

## 12.2 Step 2: Open Checkout

The user navigates to the checkout page.

The page reads the cart items and collects customer information such as:

- Name.
- Email.
- Phone number.
- Delivery address.
- City.
- State.
- PIN code.
- Payment method.

The frontend validates the fields before submitting the request.

Frontend validation improves usability, but the backend must also validate the request because browser-side checks can be bypassed.

## 12.3 Step 3: Submit the Order

The frontend calls the order service.

The request is sent to:

```text
POST /api/orders
```

The request body contains the delivery information, payment method, and selected product IDs and quantities.

The token is sent in the `Authorization` header because the order endpoint requires authentication.

## 12.4 Step 4: Authentication Middleware

The backend verifies the JWT.

If the token is invalid or missing, the middleware returns an error and prevents the order controller from processing the request.

If verification succeeds, the controller receives the authenticated user ID.

## 12.5 Step 5: Validate the Order

The controller should validate:

- Required delivery fields.
- Phone and PIN code formats where appropriate.
- Supported payment methods.
- Product identifiers.
- Positive integer quantities.
- Product availability and pricing.

The backend should not trust the browser's supplied prices or totals.

In ShopEasy's external-product workflow, the backend can retrieve the product details from DummyJSON and use its trusted response as the basis for calculating prices, subject to the application's pricing policy.

## 12.6 Step 6: Calculate the Total

The backend calculates each line total:

```text
Line total = Unit price × Quantity
```

Then it calculates the subtotal:

```text
Subtotal = Sum of all line totals
```

Finally:

```text
Order total = Subtotal + Shipping charges
```

The application should use one consistent currency for the entire calculation.

If prices from the external API are in USD but the store displays INR, conversion must occur before the INR values are saved as order prices. The backend should be the authority for the final totals.

## 12.7 Step 7: Save the Order

The backend inserts the order into the `orders` table.

It then inserts the products into `order_items`, associating each item with the new order ID.

The transaction is committed if all required operations succeed.

## 12.8 Step 8: Return a Response

The backend returns a successful response containing the order information or order ID.

If the request fails, the backend should return an appropriate error and avoid leaving partial database records.

## 12.9 Step 9: Update the Frontend

When the frontend receives a successful response:

1. It clears the cart.
2. It navigates to the order-success page.
3. It displays the order confirmation.

The cart should only be cleared after the backend confirms that the order was created successfully.

## 12.10 Step 10: Display Order History

When the user opens the profile page, the frontend requests:

```text
GET /api/orders
```

The request includes the JWT.

The backend verifies the token, retrieves the user's orders from PostgreSQL, joins the order-item data, and returns the results.

The frontend stores the response in React state and renders each order and its items.

---

# 13. How the Profile Page Retrieves Order History

The Profile page demonstrates the complete frontend-to-database communication process.

## Step 1: Read the Current User

The Profile component obtains the user from AuthContext.

If the authentication state is still loading, it displays a loading message.

If the user is not logged in, it prompts them to log in.

## Step 2: Send the Request

The component retrieves the saved JWT and calls the orders endpoint.

The request includes:

```http
GET /api/orders
Authorization: Bearer YOUR_JWT_TOKEN
```

## Step 3: Verify the User

The authentication middleware verifies the token and extracts the user ID.

## Step 4: Query PostgreSQL

The controller retrieves orders belonging to that user.

It can use a SQL join between `orders` and `order_items` to retrieve the order and its products.

## Step 5: Structure the Response

The controller groups the rows so each order contains an array of its items.

A representative response structure is:

```json
{
  "orders": [
    {
      "id": 101,
      "total": 4000,
      "status": "Placed",
      "items": [
        {
          "id": 12,
          "name": "Wireless Headphones",
          "quantity": 2,
          "price": 2000,
          "lineTotal": 4000
        }
      ]
    }
  ]
}
```

This is an illustrative response, not actual order data.

## Step 6: Render the Orders

The Profile component uses React's array mapping to render an order card for each order and a product row for each order item.

The product ID is used when linking an order item back to its product details page.

The product ID saved in `order_items` must match the ID expected by the product-details service.

---

# 14. Product Details and Related Products

The ProductDetails page demonstrates route parameters, API integration, and component state.

## 14.1 Dynamic Routes

A route such as:

```text
/products/12
```

contains a dynamic product ID.

React Router's `useParams()` retrieves the ID.

```javascript
const { id } = useParams()
```

## 14.2 Fetching Product Data

The component calls:

```javascript
const data = await getProductById(id)
```

The product service retrieves the corresponding product from the product source.

After receiving the response, the component updates its product state and selected image.

## 14.3 Loading and Error States

While the request is running, the page displays a loading message.

If the request fails, the page displays an error state.

When the product is available, the component renders the product details.

This approach improves the user experience and avoids trying to render missing data while a request is still in progress.

## 14.4 Related Products

The component can filter the shared product list by category and exclude the currently displayed product.

The filtered list is then passed to ProductCard components.

This demonstrates how React can combine shared data, array methods, and reusable components.

---

# 15. State Management and React Rendering

React state stores data that can change while the application is running.

For example:

```javascript
const [loading, setLoading] = useState(true)
```

This creates a state variable and a function that updates it.

When state changes, React re-renders the component as needed.

In ShopEasy, state is used for:

- Current product.
- Selected product image.
- Loading and error messages.
- Cart items.
- Current user.
- Order history.
- Checkout form data.
- Mobile navigation state.

## 15.1 useState

`useState` stores component state.

Example:

```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false)
```

Clicking the menu button updates the state, which changes the CSS class and opens or closes the menu.

## 15.2 useEffect

`useEffect` performs side effects such as fetching data or synchronizing state with browser storage.

For example, ProductDetails uses an effect to retrieve product information when the route ID changes.

An effect can also clean up resources, such as aborting a fetch when a component unmounts.

## 15.3 useContext

`useContext` accesses shared context data.

The Header uses cart context to display the cart count and authentication context to display the appropriate account controls.

## 15.4 useMemo

`useMemo` can cache the result of a calculation until its dependencies change.

CartContext uses it to derive the cart item count and total from the cart items.

## 15.5 Component Props

Props allow a parent component to pass data to a child component.

For example:

```jsx
<ProductCard product={item} />
```

The ProductCard component receives the selected product through its props.

## 15.6 React Router Hooks

- `useParams()` reads dynamic route parameters.
- `useNavigate()` performs programmatic navigation.
- `Link` provides navigation between routes.

These hooks help connect the application's pages without manually managing browser navigation.

---

# 16. How the Header Works

The Header combines routing, context, and responsive UI behaviour.

### Logo and Navigation

React Router's `Link` component navigates to the selected route.

### Search Button

The search icon navigates to the products page, where product search can be performed if implemented.

### Authentication Controls

The Header reads the current user and authentication loading state from AuthContext.

It displays Login and Sign Up when there is no authenticated user, or My Profile and Logout when a user is logged in.

### Cart Indicator

The Header reads `cartItemCount` from CartContext.

Whenever cart state changes, the count can update automatically.

### Mobile Navigation

A state variable controls whether the mobile menu is open.

The CSS class changes according to that state, allowing the menu to appear or disappear.

This is an example of React state controlling the visual presentation of the interface.

---

# 17. API Endpoints and HTTP Methods

The following endpoints are part of the application's intended API structure. Confirm them against the actual Express routes in the repository.

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| GET | `/` | Check server availability | Usually not required |
| GET | `/api/db-test` | Check database connectivity | Usually not required |
| POST | `/api/auth/register` | Register a user | Usually not required |
| POST | `/api/auth/login` | Authenticate a user | Usually not required |
| GET | `/api/auth/me` | Retrieve current user information | Required |
| GET | `/api/orders` | Retrieve the current user's orders | Required |
| POST | `/api/orders` | Create an order | Required |

## Example: Login Request

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "user@example.com",
  "password": "example-password"
}
```

The backend verifies the credentials and returns the result.

## Example: Protected Order Request

```http
GET /api/orders
Authorization: Bearer YOUR_JWT_TOKEN
```

The authentication middleware verifies the token before the controller returns the user's order history.

---

# 18. Security and Validation

A full-stack application must validate input and protect sensitive operations on the server.

## 18.1 Password Security

- Hash passwords with bcrypt before storing them.
- Never return password hashes in API responses.
- Never store passwords in plain text.

## 18.2 Authentication

- Verify JWTs on protected endpoints.
- Use a strong JWT secret.
- Set appropriate token expiration.
- Reject missing, invalid, or expired tokens.

## 18.3 Database Security

- Use parameterized SQL queries.
- Keep credentials in environment variables.
- Use database constraints and foreign keys where appropriate.
- Limit database privileges to what the application needs.

## 18.4 Order Validation

- Validate product IDs and quantities.
- Calculate prices and totals on the backend.
- Verify that users can access only their own orders.
- Use database transactions for multi-step order creation.

## 18.5 Frontend Validation

The frontend can validate email formats, phone numbers, PIN codes, and required fields.

However, frontend validation is only a convenience. The backend must independently validate important values before processing them.

## 18.6 Payment Security

A selected payment method is not the same as a completed payment.

If the project uses a card selection without a real payment gateway, the application should not claim that an actual card payment has been processed. A production application needs a secure payment-provider integration.

---

# 19. Error Handling and Debugging

Common problems can occur at different layers.

| Problem | Possible cause | What to check |
|---|---|---|
| Frontend cannot reach backend | Incorrect API URL or server stopped | Backend port and service URL |
| CORS error | Origin not permitted | CORS configuration |
| Request body is empty | JSON middleware missing or wrong content type | `express.json()` and request headers |
| Login fails | Incorrect credentials or database query issue | Auth controller and users table |
| Protected endpoint returns 401 | Missing or invalid token | AuthContext and auth middleware |
| Orders do not appear | Incorrect query, response shape, or user ID | Order controller and Profile page |
| Product details fail | Incorrect product ID or API mapping | `getProductById()` and product service |
| Cart count is wrong | Cart state or quantity logic issue | CartContext |
| Database connection fails | Incorrect credentials or PostgreSQL unavailable | `.env`, `db.js`, database service |
| Order partially saves | Missing transaction or rollback | Order controller |
| Product price is inconsistent | Incorrect currency conversion | Product service, checkout, backend |

## Debugging Strategy

1. Check the browser console for frontend errors.
2. Check the Network tab in browser developer tools.
3. Inspect the request URL, method, headers, and body.
4. Inspect the HTTP status code and response body.
5. Check the backend terminal for server errors.
6. Verify database connectivity.
7. Test the endpoint independently using Postman.
8. Check whether the frontend expects the same response shape that the backend returns.

This approach helps isolate whether a problem belongs to the UI, service layer, backend route, middleware, controller, or database.

---

# 20. Running and Testing the Project

## Prerequisites

Install Node.js, npm, PostgreSQL, and Git.

## Start the Backend

Open a terminal in the backend directory:

```bash
cd backend
npm install
npm run dev
```

If no development script exists, use the start command configured in `backend/package.json`.

## Start the Frontend

Open another terminal in the project root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Test the Main Workflow

1. Open the home page.
2. Browse the products.
3. Open a product details page.
4. Add a product to the cart.
5. Verify that the cart count changes.
6. Register a new account.
7. Log in.
8. Proceed to checkout.
9. Submit an order using the supported payment method.
10. Verify the order was saved.
11. Open the profile page.
12. Verify that the order and its items appear.
13. Log out and verify that protected pages require authentication.

Use Postman to test backend endpoints separately.

---

# 21. Important Technical Concepts for Interviews

## What is the difference between frontend and backend?

The frontend is the user-facing part of the application. It displays products, forms, navigation, and order history.

The backend processes requests, validates data, authenticates users, applies business logic, and communicates with the database.

## Why did you use React?

React allows the application to be divided into reusable components. Its state-management and rendering model make it suitable for interactive features such as shopping carts, product filters, and authentication-aware navigation.

## Why did you use Node.js and Express?

Node.js allows JavaScript to run on the server, while Express simplifies routing, middleware, and HTTP request handling. Together, they provide a practical way to build REST APIs.

## Why did you use PostgreSQL?

PostgreSQL stores structured and related information. Users, orders, and order items have relationships that can be represented through primary keys and foreign keys.

## Why use middleware?

Middleware allows shared request-processing logic to run before controllers. Authentication middleware verifies the JWT before allowing access to protected order endpoints.

## What is the purpose of a controller?

A controller processes the request, validates the input, performs the required business logic, communicates with the database or external services, and returns a response.

## What is the difference between routes and controllers?

Routes define which endpoint handles a request. Controllers implement the logic that runs when the route is matched.

For example:

```javascript
router.post('/login', loginUser)
```

The route defines the endpoint, and `loginUser` performs the login operation.

## Why use JWT?

JWT allows the server to verify the identity represented by a token on subsequent requests. It allows protected endpoints to identify the user without asking for their password on every request.

## Why use bcrypt?

bcrypt hashes passwords before they are stored and provides a password-comparison function during login.

## Why use Context API?

Context provides shared data to multiple components. ShopEasy uses it to share authentication information and shopping-cart state without passing props through every level of the component tree.

## Why use a service layer?

The service layer centralizes API communication, making components easier to maintain and reducing duplicated request code.

## Why use database transactions?

Order creation involves multiple related inserts. A transaction ensures that the required database changes succeed together or are rolled back if an operation fails.

## How does the frontend communicate with the database?

The frontend does not directly connect to PostgreSQL. It sends HTTP requests to the backend. Express processes the requests and accesses PostgreSQL using the server-side database client.

---

# 22. Complete Project Workflow Summary

ShopEasy begins with a React frontend that displays the shopping interface. React Router manages navigation, and reusable components display the header, products, forms, and order information.

The frontend service layer sends HTTP requests to the Node.js and Express backend. Express middleware processes incoming requests, and route definitions direct them to controllers.

For authentication, the backend verifies credentials using bcrypt and returns a JWT. The frontend stores the token and includes it in protected requests.

For shopping, CartContext maintains cart items and quantities and persists them in local storage. During checkout, the frontend submits the selected products and delivery information to the order API.

The backend verifies the user, validates the request, calculates the order totals, and stores the order and order items in PostgreSQL. The Profile page later requests the user's orders through the protected API and renders the response.

This architecture separates the user interface, shared frontend state, API communication, business logic, authentication, and database storage. That separation makes the application easier to understand, debug, and extend.

---

# 23. Conclusion

ShopEasy demonstrates the integration of frontend development, backend API development, authentication, relational database operations, and external API integration in a single web application.

The project provides practical experience with React components, Context API, React Router, HTTP requests, Express middleware, controllers, JWT authentication, password hashing, PostgreSQL relationships, database transactions, and error handling.

These concepts are fundamental to developing full-stack web applications and provide a strong foundation for further work in scalable application development.

**Note:** This document describes the ShopEasy architecture based on the available project information. Before using it as a formal implementation specification, verify that the file names, endpoints, SQL schema, response fields, payment behaviour, and scripts match the current GitHub repository.
