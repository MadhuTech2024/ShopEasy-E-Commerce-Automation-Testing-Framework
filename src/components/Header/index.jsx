import {useState} from 'react'
import {useCart} from '../../context/CartContext'
import {useNavigate} from 'react-router'
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {cartItemCount} = useCart()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <a href="/" className="logo" onClick={closeMenu}>
          Shop<span>Easy</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-navigation">
          <a href="/" className="nav-link active">
            Home
          </a>

          <a href="#products" className="nav-link">
            Products
          </a>

          <a href="#categories" className="nav-link">
            Categories
          </a>

          <a href="#offers" className="nav-link">
            Offers
          </a>

          <a href="#about" className="nav-link">
            About
          </a>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Search */}
          <button
            type="button"
            className="icon-button"
            aria-label="Search products"
          
          >
            <svg
              className="header-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M20 20L16.5 16.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
             
          </button>

          {/* Authentication */}
          <div className="auth-buttons">
            <button type="button" className="login-button">
              Login
            </button>

            <button type="button" className="signup-button">
              Sign Up
            </button>
          </div>

          {/* Cart */}
         <button
  type="button"
  className="cart-button"
  aria-label="Shopping cart"
    onClick={() => navigate('/cart')}
>
  <svg
    className="header-icon"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 4H5L7.2 14.4C7.4 15.3 8.2 16 9.2 16H17.5C18.4 16 19.2 15.4 19.5 14.5L21 8H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle
      cx="9.5"
      cy="20"
      r="1.5"
      fill="currentColor"
    />

    <circle
      cx="17.5"
      cy="20"
      r="1.5"
      fill="currentColor"
    />
  </svg>

  <span className="cart-text">Cart</span>

  <span className="cart-count">
    {cartItemCount}
  </span>
</button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`mobile-navigation ${isMenuOpen ? 'show' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <a href="/" onClick={closeMenu}>
          Home
        </a>

        <a href="#products" onClick={closeMenu}>
          Products
        </a>

        <a href="#categories" onClick={closeMenu}>
          Categories
        </a>

        <a href="#offers" onClick={closeMenu}>
          Offers
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <div className="mobile-auth">
          <button type="button" className="mobile-login-button">
            Login
          </button>

          <button type="button" className="mobile-signup-button">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header