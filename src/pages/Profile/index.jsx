
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from '../../services/api';
import './index.css';

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const Profile = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [delivery, setDelivery] = useState({
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [editing, setEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (authLoading || !user) return;

    const storageKey = `shopeasy_profile_${user.id}`;

    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        setDelivery((previous) => ({
          ...previous,
          ...JSON.parse(saved),
        }));
      }
    } catch {
      console.warn('Could not read saved delivery information.');
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError('');

      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || 'Could not load your order history.'
          );
        }

        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setOrdersError(error.message || 'Something went wrong.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setOrdersLoading(false);
        }
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, [authLoading, user]);

  const handleSaveDelivery = (event) => {
    event.preventDefault();

    if (
      delivery.phone &&
      !/^\d{10}$/.test(delivery.phone)
    ) {
      setSaveMessage('Enter a valid 10-digit phone number.');
      return;
    }

    if (
      delivery.pincode &&
      !/^\d{6}$/.test(delivery.pincode)
    ) {
      setSaveMessage('Enter a valid 6-digit PIN code.');
      return;
    }

    try {
      localStorage.setItem(
        `shopeasy_profile_${user.id}`,
        JSON.stringify(delivery)
      );

      setEditing(false);
      setSaveMessage('Delivery details saved successfully.');
    } catch {
      setSaveMessage('Could not save your details in this browser.');
    }
  };

  if (authLoading) {
    return (
      <main className="profile-page">
        <p className="profile-message">Loading your profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile-page">
        <section className="profile-empty">
          <h2>Please log in to view your profile</h2>
          <Link className="profile-btn profile-btn-primary" to="/login">
            Log in
          </Link>
        </section>
      </main>
    );
  }

  const completedOrPlacedOrders = orders.length;
  const totalSpent = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-heading">
          <div>
            <span className="profile-eyebrow">YOUR ACCOUNT</span>
            <h1>My Profile</h1>
            <p>Manage your account, delivery details and orders.</p>
          </div>

          <button
            type="button"
            className="profile-btn profile-btn-outline"
            onClick={logout}
          >
            Log out
          </button>
        </header>

        <section className="profile-hero">
          <div className="profile-avatar">
            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
          </div>

          <div className="profile-hero-info">
            <span className="profile-member-label">ShopEasy member</span>
            <h2>{user.name || 'Customer'}</h2>
            <p>{user.email}</p>
          </div>

          <Link to="/products" className="profile-btn profile-btn-light">
            Continue shopping
          </Link>
        </section>

        <section className="profile-stats">
          <article className="profile-stat-card">
            <span className="profile-stat-icon">📦</span>
            <div>
              <p>Total orders</p>
              <h3>{ordersLoading ? '—' : completedOrPlacedOrders}</h3>
            </div>
          </article>

          <article className="profile-stat-card">
            <span className="profile-stat-icon">₹</span>
            <div>
              <p>Total order value</p>
              <h3>{ordersLoading ? '—' : formatPrice(totalSpent)}</h3>
            </div>
          </article>

          <article className="profile-stat-card">
            <span className="profile-stat-icon">🏠</span>
            <div>
              <p>Delivery details</p>
              <h3>{delivery.address ? 'Saved' : 'Not added'}</h3>
            </div>
          </article>
        </section>

        <div className="profile-content-grid">
          <section className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2>Personal information</h2>
                <p>Your account details</p>
              </div>

              <button
                type="button"
                className="profile-btn profile-btn-outline"
                onClick={() => {
                  setEditing((value) => !value);
                  setSaveMessage('');
                }}
              >
                {editing ? 'Cancel' : 'Edit details'}
              </button>
            </div>

            <div className="profile-info-row">
              <span>Full name</span>
              <strong>{user.name || 'Not provided'}</strong>
            </div>

            <div className="profile-info-row">
              <span>Email address</span>
              <strong className="profile-email">{user.email}</strong>
            </div>

            {editing ? (
              <form className="profile-form" onSubmit={handleSaveDelivery}>
                <h3>Delivery information</h3>

                <label>
                  Phone number
                  <input
                    value={delivery.phone}
                    maxLength={10}
                    inputMode="numeric"
                    onChange={(e) =>
                      setDelivery({ ...delivery, phone: e.target.value })
                    }
                    placeholder="10-digit phone number"
                  />
                </label>

                <label>
                  Address
                  <input
                    value={delivery.address}
                    onChange={(e) =>
                      setDelivery({ ...delivery, address: e.target.value })
                    }
                    placeholder="House number, street, area"
                  />
                </label>

                <div className="profile-form-row">
                  <label>
                    City
                    <input
                      value={delivery.city}
                      onChange={(e) =>
                        setDelivery({ ...delivery, city: e.target.value })
                      }
                      placeholder="City"
                    />
                  </label>

                  <label>
                    State
                    <input
                      value={delivery.state}
                      onChange={(e) =>
                        setDelivery({ ...delivery, state: e.target.value })
                      }
                      placeholder="State"
                    />
                  </label>
                </div>

                <label>
                  PIN code
                  <input
                    value={delivery.pincode}
                    maxLength={6}
                    inputMode="numeric"
                    onChange={(e) =>
                      setDelivery({ ...delivery, pincode: e.target.value })
                    }
                    placeholder="6-digit PIN code"
                  />
                </label>

                {saveMessage && (
                  <p className="profile-feedback">{saveMessage}</p>
                )}

                <button
                  type="submit"
                  className="profile-btn profile-btn-primary"
                >
                  Save delivery details
                </button>
              </form>
            ) : (
              <>
                <div className="profile-info-row">
                  <span>Phone number</span>
                  <strong>{delivery.phone || 'Not added'}</strong>
                </div>

                <div className="profile-info-row">
                  <span>Delivery address</span>
                  <strong>
                    {delivery.address
                      ? [
                          delivery.address,
                          delivery.city,
                          delivery.state,
                          delivery.pincode,
                        ]
                          .filter(Boolean)
                          .join(', ')
                      : 'No saved address'}
                  </strong>
                </div>

                {saveMessage && (
                  <p className="profile-feedback">{saveMessage}</p>
                )}
              </>
            )}
          </section>

          <aside className="profile-card profile-shortcuts">
            <h2>Quick links</h2>
            <Link to="/products" className="profile-shortcut">
              <span>Explore products</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/cart" className="profile-shortcut">
              <span>View shopping cart</span>
              <span aria-hidden="true">→</span>
            </Link>
            <a href="#order-history" className="profile-shortcut">
              <span>Track order history</span>
              <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>

        <section className="profile-card profile-orders" id="order-history">
          <div className="profile-card-heading profile-orders-heading">
            <div>
              <h2>My orders</h2>
              <p>Your order history from ShopEasy</p>
            </div>
            <span className="profile-order-count">
              {ordersLoading ? 'Loading...' : `${orders.length} orders`}
            </span>
          </div>

          {ordersLoading ? (
            <p className="profile-message">Fetching your orders...</p>
          ) : ordersError ? (
            <div className="profile-error">
              <p>{ordersError}</p>
              <button
                type="button"
                className="profile-btn profile-btn-outline"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="profile-empty">
              <div className="profile-empty-icon">🛍️</div>
              <h3>No orders yet</h3>
              <p>Your placed orders will appear here.</p>
              <Link
                to="/products"
                className="profile-btn profile-btn-primary"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="profile-order-list">
              {orders.map((order) => (
                <article className="profile-order" key={order.id}>
                  <div className="profile-order-top">
                    <div>
                      <span className="profile-order-label">ORDER ID</span>
                      <h3>#{order.id}</h3>
                      <p>{formatDate(order.createdAt)}</p>
                    </div>

                    <div className="profile-order-total">
                      <span>Total amount</span>
                      <strong>{formatPrice(order.total)}</strong>
                    </div>
                  </div>

                  <div className="profile-order-status-row">
                    <span
                      className={`profile-status profile-status-${String(
                        order.status || 'placed'
                      ).toLowerCase()}`}
                    >
                      {order.status || 'Placed'}
                    </span>
                    <span className="profile-payment">
                      Payment: {order.paymentMethod || '—'}
                    </span>
                  </div>

                  <div className="profile-order-items">
                 {order.items.map((item, index) => (
  <Link
    to={`/products/${item.id}`}
    className="profile-order-item profile-order-item-link"
    key={`${order.id}-${item.id}-${index}`}
  >
    {item.image ? (
      <img src={item.image} alt={item.name} />
    ) : (
      <div className="profile-item-placeholder">📦</div>
    )}

    <div className="profile-item-info">
      <strong>{item.name}</strong>

      <span>
        Qty: {item.quantity} × {formatPrice(item.price)}
      </span>

      <span className="profile-view-product">
        View product →
      </span>
    </div>

    <strong className="profile-item-total">
      {formatPrice(item.lineTotal)}
    </strong>
  </Link>
))}
                  </div>

                  <div className="profile-order-footer">
                    <span>
                      Deliver to: {order.address}, {order.city},{' '}
                      {order.state} {order.pincode}
                    </span>
                    <span>
                      Payment status: {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
