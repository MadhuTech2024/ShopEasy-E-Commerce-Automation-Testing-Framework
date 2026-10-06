import {useState} from 'react'
import {Link} from 'react-router'

import {useCart} from '../../context/CartContext'

import './index.css'

const ProductCard = ({product}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const {addToCart} = useCart()

  const {
    name,
    description,
    price,
    category,
    rating,
    image,
    discountPercentage,
  } = product

  const originalPrice =
    discountPercentage > 0
      ? Math.round(
          price / (1 - discountPercentage / 100),
        )
      : price

  const handleAddToCart = () => {
    addToCart(product)

    setAddedToCart(true)

    setTimeout(() => {
      setAddedToCart(false)
    }, 1500)
  }

  return (
    <article className="product-card">
      <div className="product-image-container">
        <Link
          to={`/products/${product.id}`}
          className="product-image-link"
        >
          <img
            src={image}
            alt={name}
            className="product-image"
          />
        </Link>

        {discountPercentage > 0 && (
          <span className="discount-badge">
            {Math.round(discountPercentage)}% OFF
          </span>
        )}

        <button
          type="button"
          className={`wishlist-button ${
            isWishlisted ? 'wishlist-active' : ''
          }`}
          onClick={() =>
            setIsWishlisted(previous => !previous)
          }
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <Link
          to={`/products/${product.id}`}
          className="quick-view-button"
        >
          Quick View
        </Link>
      </div>

      <div className="product-content">
        <p className="product-category">
          {category}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="product-name-link"
        >
          <h3 className="product-name">{name}</h3>
        </Link>

        <p className="product-description">
          {description}
        </p>

        <div className="product-rating">
          <span>★</span>
          <span>{rating}</span>

          <span className="review-count">
            (128 reviews)
          </span>
        </div>

        <div className="product-price-container">
          <div className="product-prices">
            <span className="product-price">
              ${price}
            </span>

            {discountPercentage > 0 && (
              <span className="original-price">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="add-cart-button"
          onClick={handleAddToCart}
        >
          <span>
            {addedToCart ? '✓' : '+'}
          </span>

          {addedToCart
            ? 'Added to Cart'
            : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard