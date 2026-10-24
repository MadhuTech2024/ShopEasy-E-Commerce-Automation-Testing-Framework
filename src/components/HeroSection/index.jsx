import './index.css'
import {Link} from 'react-router'
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">✨ Quality products, better shopping</span>

          <h1 className="hero-title">
            Discover Products
            <span> You’ll Love.</span>
          </h1>

          <p className="hero-description">
            Explore carefully selected products at great prices. Find
            everything you need for your everyday lifestyle in one place.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-primary-button">
              Shop Now
              <span>→</span>
            </Link>

            <Link to="/categories" className="hero-secondary-button">
              Explore Categories
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div className="hero-stat">
              <strong>4.8★</strong>
              <span>Customer Rating</span>
            </div>

            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <div className="hero-product-card hero-card-main">
            <div className="hero-product-icon">🎧</div>

            <div>
              <span>Featured Product</span>
              <strong>Wireless Headphones</strong>
              <b>₹2,499</b>
            </div>
          </div>

          <div className="hero-floating-card hero-rating-card">
            <span className="rating-star">★</span>

            <div>
              <strong>4.8</strong>
              <span>Excellent Rating</span>
            </div>
          </div>

          <div className="hero-floating-card hero-offer-card">
            <strong>20% OFF</strong>
            <span>Today's Offer</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection