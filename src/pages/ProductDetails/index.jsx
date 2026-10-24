import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router'
import {useCart} from '../../context/CartContext'
import { formatUsdAsInr } from '../../utils/currency';

import {useProducts} from '../../context/ProductsContext'
import {getProductById} from '../../services/productService'

import ProductCard from '../../components/productCard'

import './index.css'

const ProductDetails = () => {
  const {id} = useParams()
  const {addToCart} = useCart()


  const {products} = useProducts()

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getProductById(id)

        setProduct(data)
        setSelectedImage(data.image)
      } catch (err) {
        setError('Unable to load product.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="product-details-status">
        <p>Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-details-status">
        <h2>Product Not Found</h2>

        <p>
          The product you are looking for does not exist.
        </p>

        <Link to="/" className="back-products-button">
          ← Back to Products
        </Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter(
      item =>
        item.category === product.category &&
        item.id !== product.id,
    )
    .slice(0, 4)

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]

  return (
    <main className="product-details-page">
      <div className="product-details-container">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="back-products-button"
        >
          ← Back to Products
        </Link>

        {/* Product Main Section */}
        <section className="product-details-section">

          {/* Image Gallery */}
          <div className="product-gallery">

            <div className="thumbnail-list">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`thumbnail-button ${
                    selectedImage === image
                      ? 'thumbnail-active'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className="main-product-image-container">
              <img
                src={selectedImage}
                alt={product.name}
                className="main-product-image"
              />

              {product.discountPercentage > 0 && (
                <span className="details-discount-badge">
                  {Math.round(
                    product.discountPercentage,
                  )}
                  % OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="product-information">

            <p className="details-category">
              {product.category}
            </p>

            <h1>{product.name}</h1>

            {product.brand && (
              <p className="details-brand">
                Brand: <strong>{product.brand}</strong>
              </p>
            )}

            <div className="details-rating">
              <span className="stars">★</span>

              <strong>{product.rating}</strong>

              <span>
                Based on customer reviews
              </span>
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="details-price-section">
              <span className="details-price">
                {formatUsdAsInr(product.price)}
              </span>

              {product.discountPercentage > 0 && (
                <span className="details-discount">
                  {Math.round(
                    product.discountPercentage,
                  )}
                  % OFF
                </span>
              )}
            </div>

            <div className="product-availability">
              <p>
                <strong>Availability:</strong>{' '}
                {product.availabilityStatus}
              </p>

              <p>
                <strong>Stock:</strong>{' '}
                {product.stock} units
              </p>
            </div>

            <div className="details-actions">
          <button
              type="button"
              className="details-add-cart-button"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>

              <button
                type="button"
                className="details-wishlist-button"
              >
                ♡
              </button>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="product-description-section">
          <h2>Product Information</h2>

          <p>{product.description}</p>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="related-products-header">
              <div>
                <p className="section-label">
                  YOU MAY ALSO LIKE
                </p>

                <h2>Related Products</h2>
              </div>

              <Link to="/" className="view-all-link">
                View All →
              </Link>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default ProductDetails