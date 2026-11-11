# 🛍️ ShopEasy – Full-Stack E-Commerce Web Application

ShopEasy is a full-stack e-commerce web application that provides a simple and responsive online shopping experience. Users can explore products, view product details, manage their shopping cart, register or log in securely, place orders, and view their order history.

The application uses React.js for the frontend, Node.js and Express.js for backend APIs, PostgreSQL for database management, and JWT-based authentication for protected operations.

## ✨ Features

### 🛒 Product Browsing
- Browse products and explore product details.
- View product images, descriptions, prices, ratings, and categories.
- Explore related products.
- Search and filter products using the available product-page features.

### 🔐 User Authentication
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected user-specific operations.
- Persistent login sessions using a stored authentication token.

### 🛍️ Shopping Cart
- Add products to the cart.
- Increase or decrease product quantities.
- Remove products from the cart.
- Calculate the cart subtotal.
- Persist cart items in browser local storage.

### 📦 Checkout and Orders
- Enter customer and delivery details.
- Validate checkout information.
- Select an available payment method.
- Place orders through backend APIs.
- Save order information and individual order items in PostgreSQL.
- View order history and order details in the profile page.

### 👤 User Profile
- View account information.
- Save delivery details in the browser.
- View previous orders and order totals.
- Access shopping and account-related pages.

### 📱 Responsive Interface
- Responsive layouts for different screen sizes.
- Reusable React components.
- Navigation for desktop and mobile devices.

## 🧰 Technologies Used

| Area | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Build Tool | Vite |
| Routing | React Router |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| API Testing | Postman |
| Product Data | DummyJSON API |
| Development Tools | VS Code, Git, GitHub |

## 🏗️ Project Architecture

The application follows a frontend–backend architecture.

1. **Frontend:** React components display the user interface and manage interactions.
2. **API layer:** The frontend sends HTTP requests to backend endpoints.
3. **Backend:** Express.js routes and controllers process requests, validate data, and enforce authentication.
4. **Database:** PostgreSQL stores user accounts, orders, and order items.
5. **External product API:** DummyJSON supplies product information used by the application.

```text
User
  |
  v
React.js Frontend
  |
  | HTTP / REST API requests
  v
Node.js + Express.js Backend
  |
  +---- Authentication and JWT
  |
  +---- PostgreSQL Database
  |       |
  |       +---- Users
  |       +---- Orders
  |       +---- Order Items
  |
  +---- DummyJSON Product API
```

## 📁 Project Structure

The structure below is a guide. Adjust the paths to match your actual repository.

```text
ShopEasy/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── orderRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── components/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ProductsContext.jsx
│   ├── pages/
│   │   ├── Home/
│   │   ├── Products/
│   │   ├── ProductDetails/
│   │   ├── Categories/
│   │   ├── Offers/
│   │   ├── About/
│   │   ├── Login/
│   │   ├── SignUp/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── OrderSuccess/
│   │   └── Profile/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- PostgreSQL
- Git
- A code editor such as Visual Studio Code

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ShopEasy
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install frontend dependencies

From the project root directory:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory.
You can copy `backend/.env.example` and update its values.

Example configuration:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopeasy
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
JWT_SECRET=replace_with_a_strong_random_secret
FRONTEND_ORIGINS=http://localhost:5173
```

Update the database credentials to match your local PostgreSQL configuration.
For local development, set `VITE_API_BASE_URL=http://localhost:5001/api` in
the root `.env` file. The default `/api` URL is used for same-origin Netlify
deployments.

**Security:** Never commit your real `.env` file, database password, JWT secret, or API keys to GitHub. Commit a sanitized `.env.example` file instead.

### 5. Create the PostgreSQL database

Open PostgreSQL or your preferred SQL client and create the database:

```sql
CREATE DATABASE shopeasy;
```

Run `backend/sql/schema.sql` against the `shopeasy` database to create the
required tables and indexes.

### 6. Start the backend server

From the `backend` directory:

```bash
npm run dev
```

If your backend does not define a `dev` script, use the start command configured in `backend/package.json`, or run:

```bash
node server.js
```

The backend is configured to use port `5001` by default.

### 7. Start the frontend

Open a second terminal at the project root:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Netlify frontend/API and Supabase
PostgreSQL deployment steps, including environment variables and logs.

## 🔌 API Endpoints

The following endpoints reflect the application's intended API structure. Confirm the implementation in your backend before relying on every endpoint.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/auth/me` | Retrieve the authenticated user's profile |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create an order |
| GET | `/api/orders` | Retrieve the authenticated user's orders |

Protected endpoints require a valid JWT in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check whether the API is running |
| GET | `/api/db-test` | Check database connectivity |

## 🔄 Application Workflow

1. A user opens ShopEasy and browses available products.
2. React displays the product data retrieved through the product service.
3. The user registers or logs in to their account.
4. The user adds products to the shopping cart.
5. CartContext manages the selected products and quantities.
6. At checkout, the user enters delivery information and selects a payment method.
7. The frontend submits the order to the Express backend.
8. The backend validates the request and saves the order and its items in PostgreSQL.
9. The user can view the saved order history on the profile page.

## 🧪 Testing

Recommended manual tests:

- Register a new account and log in.
- Verify invalid login credentials are rejected.
- Add products to the cart and change quantities.
- Refresh the page and verify cart persistence.
- Complete a checkout using the supported payment method.
- Verify the order is saved in PostgreSQL.
- Open the profile page and verify order history.
- Test protected endpoints without a token and with a valid token.
- Test the interface on desktop and mobile screen sizes.

Use Postman to test backend API requests and responses.

## 🔒 Security Considerations

- Passwords should be stored as hashes, never as plain text.
- Protected APIs should verify JWTs on the backend.
- Validate user input before processing orders.
- Keep secrets in environment variables.
- Configure CORS appropriately for the frontend origin.
- Use HTTPS when deploying the application.

## 🚀 Future Improvements

- Integrate a real payment gateway.
- Add an administrator dashboard for product and order management.
- Add order tracking and cancellation features.
- Add automated frontend and backend tests.
- Deploy the frontend, backend, and database.
- Introduce automated product recommendations.

## 👨‍💻 Author

**Madhu K.**

Full-Stack Developer | Python Developer

GitHub: [MadhuTech2024](https://github.com/MadhuTech2024)

---

*ShopEasy is a learning project developed to practise full-stack web development, REST API integration, authentication, database operations, and responsive UI development.*
