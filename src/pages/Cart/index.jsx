import {Link} from 'react-router'

import {useCart} from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h1>Your Cart is Empty</h1>

            <p>
              Looks like you haven't added any products
              to your cart yet.
            </p>

            <Link
              to="/"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <p className="cart-label">
              SHOPPING CART
            </p>

            <h1>Your Cart</h1>
          </div>

          <p className="cart-items-count">
            {cartItems.length}{' '}
            {cartItems.length === 1
              ? 'Product'
              : 'Products'}
          </p>
        </div>

        <div className="cart-content">
          <section className="cart-items-section">
            {cartItems.map(item => (
              <article
                key={item.id}
                className="cart-item"
              >
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-details">
                  <p className="cart-item-category">
                    {item.category}
                  </p>

                  <Link
                    to={`/products/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <p className="cart-item-price">
                    ${item.price}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <p className="item-total">
                    $
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="remove-item-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <div className="cart-actions">
              <Link
                to="/"
                className="continue-shopping-link"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                className="clear-cart-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ${Number(cartTotal).toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ${Number(cartTotal).toFixed(2)}
              </strong>
            </div>

            <Link
            to="/checkout"
            className="checkout-button"
            >
            Proceed to Checkout
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Cart