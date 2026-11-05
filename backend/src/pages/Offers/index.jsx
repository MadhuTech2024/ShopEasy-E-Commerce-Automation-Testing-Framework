
import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router'

import {useProducts} from '../../context/ProductsContext'

import ProductCard from '../../components/productCard'

import './index.css'

const discountFilters = [
  {
    label: 'All Deals',
    value: 0,
  },
  {
    label: '10%+ Off',
    value: 10,
  },
  {
    label: '20%+ Off',
    value: 20,
  },
  {
    label: '30%+ Off',
    value: 30,
  },
]

const Offers = () => {
  const navigate = useNavigate()

  const {
    products,
    loading,
    error,
  } = useProducts()

  const [selectedDiscount, setSelectedDiscount] =
    useState(0)

  const offerProducts = useMemo(() => {
    return products
      .filter(
        product =>
          Number(product.discountPercentage) >=
          selectedDiscount &&
          Number(product.discountPercentage) > 0,
      )
      .sort(
        (a, b) =>
          Number(b.discountPercentage) -
          Number(a.discountPercentage),
      )
  }, [products, selectedDiscount])

  const allOfferProducts = useMemo(() => {
    return products
      .filter(
        product =>
          Number(product.discountPercentage) > 0,
      )
      .sort(
        (a, b) =>
          Number(b.discountPercentage) -
          Number(a.discountPercentage),
      )
  }, [products])

  const highestDiscount =
    allOfferProducts.length > 0
      ? Math.round(
          Number(
            allOfferProducts[0].discountPercentage,
          ),
        )
      : 0

  const averageDiscount =
    allOfferProducts.length > 0
      ? Math.round(
          allOfferProducts.reduce(
            (total, product) =>
              total +
              Number(product.discountPercentage),
            0,
          ) / allOfferProducts.length,
        )
      : 0

  if (loading) {
    return (
      <main className="offers-page">
        <div className="offers-status">
          <div className="offers-loading-icon">
            %
          </div>

          <h2>Finding the best deals...</h2>

          <p>
            Please wait while we load today's offers.
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="offers-page">
        <div className="offers-status">
          <div className="offers-error-icon">
            !
          </div>

          <h2>Unable to load offers</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="offers-page">

      {/* Hero */}
      <section className="offers-hero">
        <div className="offers-container">

          <div className="offers-hero-content">

            <div className="offers-live-badge">
              <span></span>
              LIVE DEALS
            </div>

            <p className="offers-label">
              LIMITED TIME OFFERS
            </p>

            <h1>
              Great Products.
              <br />
              <span>Better Prices.</span>
            </h1>

            <p className="offers-hero-description">
              Discover amazing products with exclusive
              discounts. The bigger the deal, the more
              you save.
            </p>

            <div className="offers-hero-actions">

              <button
                type="button"
                className="offers-primary-button"
                onClick={() =>
                  document
                    .getElementById(
                      'discounted-products',
                    )
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    })
                }
              >
                Shop Deals →
              </button>

              <button
                type="button"
                className="offers-secondary-button"
                onClick={() => navigate('/products')}
              >
                View All Products
              </button>

            </div>

          </div>

          <div className="offers-hero-visual">

            <div className="offer-orbit offer-orbit-one"></div>

            <div className="offer-orbit offer-orbit-two"></div>

            <div className="offer-percent-card">
              <small>UP TO</small>

              <strong>
                {highestDiscount}%
              </strong>

              <span>OFF</span>
            </div>

            <div className="floating-offer offer-float-one">
              <span>🔥</span>
              <div>
                <strong>Hot Deal</strong>
                <small>Save More</small>
              </div>
            </div>

            <div className="floating-offer offer-float-two">
              <span>⚡</span>
              <div>
                <strong>Limited</strong>
                <small>Time Only</small>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="offers-stats-section">
        <div className="offers-container">

          <div className="offers-stats">

            <div className="offer-stat">
              <strong>
                {allOfferProducts.length}
              </strong>
              <span>Products on Sale</span>
            </div>

            <div className="offer-stat">
              <strong>
                {highestDiscount}%
              </strong>
              <span>Highest Discount</span>
            </div>

            <div className="offer-stat">
              <strong>
                {averageDiscount}%
              </strong>
              <span>Average Discount</span>
            </div>

            <div className="offer-stat">
              <strong>24/7</strong>
              <span>Deals Available</span>
            </div>

          </div>

        </div>
      </section>

      {/* Products */}
      <section
        className="offers-products-section"
        id="discounted-products"
      >
        <div className="offers-container">

          <div className="offers-section-header">

            <div>
              <p className="offers-section-label">
                DEALS FOR YOU
              </p>

              <h2>
                Discounted Products
              </h2>

              <p>
                Find your favorite products at a
                better price.
              </p>
            </div>

            <div className="offers-result-count">
              {offerProducts.length} Deals
            </div>

          </div>

          {/* Discount filters */}
          <div className="discount-filter-container">

            {discountFilters.map(filter => (
              <button
                type="button"
                key={filter.value}
                className={`discount-filter-button ${
                  selectedDiscount === filter.value
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setSelectedDiscount(filter.value)
                }
              >
                {filter.label}
              </button>
            ))}

          </div>

          {offerProducts.length === 0 ? (
            <div className="offers-empty">

              <div className="offers-empty-icon">
                🏷️
              </div>

              <h2>
                No deals in this range
              </h2>

              <p>
                Try selecting a lower discount range
                to see more products.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedDiscount(0)
                }
              >
                View All Deals
              </button>

            </div>
          ) : (
            <div className="offers-product-grid">

              {offerProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="offers-cta">
        <div className="offers-container">

          <div className="offers-cta-content">

            <div>
              <p>DON'T MISS OUT</p>

              <h2>
                More products.
                <br />
                More possibilities.
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/products')
              }
            >
              Explore Everything →
            </button>

          </div>

        </div>
      </section>

    </main>
  )
}

export default Offers

