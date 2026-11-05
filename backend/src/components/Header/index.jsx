
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCart } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { cartItemCount } = useCart()
  const { user, logout, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const closeMenu = () => setIsMenuOpen(false)

  const toggleMenu = () => {
    setIsMenuOpen(previous => !previous)
  }

  const handleSearchClick = () => {
    navigate('/products')
    closeMenu()
  }

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          Shop<span>Easy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-navigation">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/products" className="nav-link" onClick={closeMenu}>
            Products
          </Link>

          <Link to="/categories" className="nav-link" onClick={closeMenu}>
            Categories
          </Link>

          <Link to="/offers" className="nav-link" onClick={closeMenu}>
            Offers
          </Link>

          <Link to="/about" className="nav-link" onClick={closeMenu}>
            About
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Search */}
          <button
            type="button"
            className="icon-button"
            aria-label="Search products"
            onClick={handleSearchClick}
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
            {!loading && user ? (
              <>
                <Link
                  to="/profile"
                  className="login-button"
                  onClick={closeMenu}
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  className="signup-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : !loading ? (
              <>
                <Link
                  to="/login"
                  className="login-button"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="signup-button"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>

          {/* Cart */}
          <button
            type="button"
            className="cart-button"
            aria-label={`Shopping cart with ${cartItemCount} items`}
            onClick={() => {
              navigate('/cart')
              closeMenu()
            }}
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
              <circle cx="9.5" cy="20" r="1.5" fill="currentColor" />
              <circle cx="17.5" cy="20" r="1.5" fill="currentColor" />
            </svg>

            <span className="cart-text">Cart</span>
            <span className="cart-count">{cartItemCount}</span>
          </button>

          {/* Mobile Menu */}
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
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/products" onClick={closeMenu}>Products</Link>
        <Link to="/categories" onClick={closeMenu}>Categories</Link>
        <Link to="/offers" onClick={closeMenu}>Offers</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>

        <div className="mobile-auth">
          {!loading && user ? (
            <>
              <Link to="/profile" onClick={closeMenu}>
                My Profile
              </Link>

              <button
                type="button"
                className="mobile-login-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : !loading ? (
            <>
              <Link
                to="/login"
                className="mobile-login-button"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="mobile-signup-button"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  )
}

export default Header
