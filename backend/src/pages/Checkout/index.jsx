
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { createOrderApi } from '../../services/orders'
import { useCart } from '../../context/CartContext'
import './index.css'

const Checkout = () => {
  const navigate = useNavigate()

  const { user, loading: authLoading } = useContext(AuthContext)

  const { cartItems, cartTotal, clearCart } = useCart()

const [formData, setFormData] = useState(() => {
  const savedProfile = localStorage.getItem(
    `shopeasy_profile_${user?.id}`
  );

  let delivery = {};

  try {
    delivery = savedProfile ? JSON.parse(savedProfile) : {};
  } catch {
    delivery = {};
  }

  return {
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: delivery.phone || '',
    address: delivery.address || '',
    city: delivery.city || '',
    state: delivery.state || '',
    pincode: delivery.pincode || '',
  };
});
useEffect(() => {
  if (!user) return;

  let delivery = {};

  try {
    delivery = JSON.parse(
      localStorage.getItem(`shopeasy_profile_${user.id}`) || '{}'
    );
  } catch {
    delivery = {};
  }

  setFormData((previous) => ({
    ...previous,
    firstName: previous.firstName || user.name?.split(' ')[0] || '',
    lastName:
      previous.lastName ||
      user.name?.split(' ').slice(1).join(' ') ||
      '',
    email: previous.email || user.email || '',
    phone: previous.phone || delivery.phone || '',
    address: previous.address || delivery.address || '',
    city: previous.city || delivery.city || '',
    state: previous.state || delivery.state || '',
    pincode: previous.pincode || delivery.pincode || '',
  }));
}, [user]);

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [errors, setErrors] = useState({})
  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderError, setOrderError] = useState('')

  // Redirect users who are not logged in.
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?redirect=%2Fcheckout', {
        replace: true,
      })
    }
  }, [authLoading, user, navigate])

  // Pre-fill details available from the logged-in account.
  useEffect(() => {
    if (!user) return

    const nameParts = (user.name || '').trim().split(/\s+/)

    setFormData(previous => ({
      ...previous,
      firstName: previous.firstName || nameParts[0] || '',
      lastName:
        previous.lastName ||
        nameParts.slice(1).join(' ') ||
        '',
      email: previous.email || user.email || '',
    }))
  }, [user])

  const handleChange = event => {
    const { name, value } = event.target

    setFormData(previous => ({
      ...previous,
      [name]: value,
    }))

    setErrors(previous => ({
      ...previous,
      [name]: '',
    }))

    setOrderError('')
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
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
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = async event => {
    event.preventDefault()
    setOrderError('')

    if (placingOrder || authLoading) return

    if (!user) {
      navigate('/login?redirect=%2Fcheckout')
      return
    }

    if (cartItems.length === 0) {
      setOrderError('Your cart is empty.')
      return
    }

    // Validate every required field before calling the API.
    if (!validateForm()) {
      setOrderError('Please correct the highlighted fields.')
      return
    }
    localStorage.setItem(
  `shopeasy_profile_${user.id}`,
  JSON.stringify({
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode,
  })
);

    const orderData = {
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.trim(),
      paymentMethod,
      items: cartItems.map(item => ({
        id: item.id,
        quantity: Number(item.quantity),
      })),
    }

    try {
      setPlacingOrder(true)

      // The API should send the JWT token to the backend.
      // The backend must save the order to PostgreSQL.
      const result = await createOrderApi(orderData)

      // Clear the cart only after a successful response.
      clearCart()

      navigate('/order-success', {
        state: {
          order: result.order || result,
        },
        replace: true,
      })
    } catch (error) {
      if (error.status === 401) {
        navigate('/login?redirect=%2Fcheckout')
        return
      }

      setOrderError(
        error.message || 'Order failed. Please try again.',
      )
    } finally {
      setPlacingOrder(false)
    }
  }

  if (authLoading) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <p>Checking your account...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Login required</h1>
          <p>Please log in to continue to checkout.</p>
          <Link
            to="/login?redirect=%2Fcheckout"
            className="checkout-back-button"
          >
            Login
          </Link>
        </div>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>
          <p>Add some products before proceeding to checkout.</p>
          <Link to="/" className="checkout-back-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  const renderError = name =>
    errors[name] ? (
      <p className="form-error">{errors[name]}</p>
    ) : null

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/cart" className="checkout-back-link">
            ← Back to Cart
          </Link>

          <p className="checkout-label">SECURE CHECKOUT</p>
          <h1>Checkout</h1>
          <p>Complete your details to place your order.</p>
        </div>

        <form
          className="checkout-content"
          onSubmit={handlePlaceOrder}
          noValidate
        >
          <section className="customer-details">
            <div className="checkout-section">
              <h2>Contact Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {renderError('firstName')}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {renderError('lastName')}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  {renderError('email')}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                  />
                  {renderError('phone')}
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Delivery Address</h2>

              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows={4}
                />
                {renderError('address')}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  {renderError('city')}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                  {renderError('state')}
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">PIN Code</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit PIN code"
                  />
                  {renderError('pincode')}
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={event =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives</small>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={event =>
                    setPaymentMethod(event.target.value)
                  }
                />
                <span>
                  <strong>Credit / Debit Card</strong>
                  <small>
                    Card payment requires a payment gateway
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
                  <img src={item.image} alt={item.name} />

                  <div>
                    <p>{item.name}</p>
                    <span>
                      {item.quantity} × ${item.price}
                    </span>
                  </div>

                  <strong>
                    $
                    {(
                      Number(item.price) * item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-divider" />

            <div className="checkout-total-row">
              <span>Subtotal</span>
              <span>${Number(cartTotal).toFixed(2)}</span>
            </div>

            <div className="checkout-total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="checkout-divider" />

            <div className="checkout-final-total">
              <span>Total</span>
              <strong>${Number(cartTotal).toFixed(2)}</strong>
            </div>

            {orderError && (
              <p className="form-error" role="alert">
                {orderError}
              </p>
            )}

            <button
              type="submit"
              className="place-order-button"
              disabled={placingOrder}
            >
              {placingOrder ? 'Placing Order...' : 'Place Order'}
            </button>

            <p className="secure-message">
              🔒 Your information is secure and protected.
            </p>
          </aside>
        </form>
      </div>
    </main>
  )
}

export default Checkout
