import {Link} from 'react-router'

import './index.css'

const OrderSuccess = () => {
  return (
    <main className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">✓</div>

        <p className="success-label">
          ORDER CONFIRMED
        </p>

        <h1>Thank You for Your Order!</h1>

        <p className="success-message">
          Your order has been successfully placed.
          We&apos;ll send you the order details and
          delivery updates shortly.
        </p>

        <div className="order-number">
          <span>Order ID</span>
          <strong>#SE
            {Math.floor(
              100000 + Math.random() * 900000,
            )}
          </strong>
        </div>

        <Link
          to="/"
          className="continue-shopping-button"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}

export default OrderSuccess