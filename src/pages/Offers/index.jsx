
import {useProducts} from '../../context/ProductsContext'

import ProductCard from '../../components/productCard'



const Offers = () => {
  const {products, loading, error} = useProducts()

  const offerProducts = products
    .filter(product => Number(product.discountPercentage) > 0)
    .sort(
      (a, b) =>
        Number(b.discountPercentage) -
        Number(a.discountPercentage),
    )

  if (loading) {
    return (
      <main className="offers-page">
        <div className="offers-status">
          <p>Loading offers...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="offers-page">
        <div className="offers-status">
          <p>{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="offers-page">
      <div className="offers-container">
        <div className="offers-header">
          <p className="offers-label">
            LIMITED TIME DEALS
          </p>

          <h1>Today's Best Offers</h1>

          <p>
            Save more on selected products with our
            latest discounts and special deals.
          </p>
        </div>

        <div className="offers-banner">
          <div>
            <span>🔥 SPECIAL OFFERS</span>

            <h2>
              Great Products.
              <br />
              Better Prices.
            </h2>

            <p>
              Explore products with the biggest
              discounts available right now.
            </p>
          </div>

          <div className="offers-banner-percent">
            <strong>UP TO</strong>
            <span>50%</span>
            <strong>OFF</strong>
          </div>
        </div>

        {offerProducts.length === 0 ? (
          <div className="offers-status">
            <h2>No offers available</h2>

            <p>
              Check back later for new discounts.
            </p>
          </div>
        ) : (
          <section className="offers-products-section">
            <div className="offers-section-header">
              <div>
                <p className="offers-section-label">
                  DEALS FOR YOU
                </p>

                <h2>Discounted Products</h2>
              </div>

              <span>
                {offerProducts.length} Offers
              </span>
            </div>

            <div className="offers-product-grid">
              {offerProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Offers

