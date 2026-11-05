import {useProducts} from '../../context/ProductsContext'
import ProductCard from '../productCard'
import './index.css'
import SortDropdown from '../SortDropdown'
const ProductGrid = () => {
  const {
    filteredProducts,
    loading,
    error,
  } = useProducts()

  if (loading) {
    return (
      <section className="product-grid-section">
        <p>Loading products...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="product-grid-section">
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <div className="product-grid-header">
  <div>
    <p className="product-grid-label">
      OUR COLLECTION
    </p>

    <h2>Featured Products</h2>
  </div>

  <div className="product-grid-actions">
    <p className="product-count">
      {filteredProducts.length} Products
    </p>

    <SortDropdown />
  </div>
</div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>

            <p>
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid