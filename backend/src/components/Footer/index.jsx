
import {Link} from 'react-router'
import './index.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Main Footer */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Shop<span>Easy</span>
            </Link>

            <p className="footer-description">
              A modern e-commerce platform designed to make
              online shopping simple, fast and enjoyable.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                f
              </a>

              <a href="#" aria-label="Instagram">
                ◎
              </a>

              <a href="#" aria-label="Twitter">
                𝕏
              </a>

              <a href="#" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/about">About Us</Link>
          </div>


          {/* Categories */}
          <div className="footer-column">
            <h3>Categories</h3>

            <Link to="/products">Electronics</Link>
            <Link to="/products">Clothing</Link>
            <Link to="/products">Footwear</Link>
            <Link to="/products">Accessories</Link>
          </div>


          {/* Support */}
          <div className="footer-column footer-contact">
            <h3>Customer Support</h3>

            <a href="mailto:support@shopeasy.com">
              support@shopeasy.com
            </a>

            <a href="tel:+919876543210">
              +91 98765 43210
            </a>

            <p>
              Monday – Saturday
              <br />
              9:00 AM – 6:00 PM
            </p>
          </div>

        </div>


        {/* Testing Project Banner */}
        <div className="footer-project">

          <div>
            <span>PROJECT</span>

            <h3>
              Built for Real-World Testing
            </h3>

            <p>
              ShopEasy includes realistic shopping workflows
              designed for functional and Selenium automation testing.
            </p>
          </div>

          <Link
            to="/products"
            className="footer-project-button"
          >
            Explore Products
            <span>→</span>
          </Link>

        </div>


        {/* Bottom Footer */}
        <div className="footer-bottom">

          <p>
            © {currentYear} ShopEasy. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer

