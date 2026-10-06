import {useState} from 'react'
import {Link, useNavigate} from 'react-router'

import {useCart} from '../../context/CartContext'

import './index.css'

const Checkout = () => {
  const navigate = useNavigate()

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = event => {
    const {name, value} = event.target

    setFormData(previous => ({
      ...previous,
      [name]: value,
    }))

    setErrors(previous => ({
      ...previous,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email,
      )
    ) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        'Enter a valid 10-digit phone number'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        'Enter a valid 6-digit PIN code'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = event => {
    event.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    clearCart()

    navigate('/order-success')
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>

          <p>
            Add some products before proceeding to
            checkout.
          </p>

          <Link
            to="/"
            className="checkout-back-button"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <Link
            to="/cart"
            className="checkout-back-link"
          >
            ← Back to Cart
          </Link>

          <p className="checkout-label">
            SECURE CHECKOUT
          </p>

          <h1>Checkout</h1>

          <p>
            Complete your details to place your order.
          </p>
        </div>

        <form
          className="checkout-content"
          onSubmit={handlePlaceOrder}
        >
          <section className="customer-details">
            <div className="checkout-section">
              <h2>Contact Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />

                  {errors.firstName && (
                    <p className="form-error">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />

                  {errors.lastName && (
                    <p className="form-error">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                  {errors.email && (
                    <p className="form-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                  />

                  {errors.phone && (
                    <p className="form-error">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Delivery Address</h2>

              <div className="form-group full-width">
                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows="4"
                />

                {errors.address && (
                  <p className="form-error">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />

                  {errors.city && (
                    <p className="form-error">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="state">
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />

                  {errors.state && (
                    <p className="form-error">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">
                    PIN Code
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN code"
                    maxLength="6"
                  />

                  {errors.pincode && (
                    <p className="form-error">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  defaultChecked
                />

                <span>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <small>
                    Pay when your order arrives
                  </small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                />

                <span>
                  <strong>
                    Credit / Debit Card
                  </strong>

                  <small>
                    Secure card payment
                  </small>
                </span>
              </label>
            </div>
          </section>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-products">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="checkout-product"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <p>{item.name}</p>

                    <span>
                      {item.quantity} × $
                      {item.price}
                    </span>
                  </div>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-divider" />

            <div className="checkout-total-row">
              <span>Subtotal</span>

              <span>
                ${Number(cartTotal).toFixed(2)}
              </span>
            </div>

            <div className="checkout-total-row">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <div className="checkout-divider" />

            <div className="checkout-final-total">
              <span>Total</span>

              <strong>
                ${Number(cartTotal).toFixed(2)}
              </strong>
            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order
            </button>

            <p className="secure-message">
              🔒 Your information is secure and
              protected.
            </p>
          </aside>
        </form>
      </div>
    </main>
  )
}

export default Checkout