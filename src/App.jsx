
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router'

import ProductsProvider from './context/ProductsContext'
import CartProvider from './context/CartContext'

import Header from './components/Header'

import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Offers from './pages/Offers'
import About from './pages/About'

import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'

const App = () => {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <Header />

          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/categories"
              element={<Categories />}
            />

            <Route
              path="/offers"
              element={<Offers />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default App

