
import {useNavigate} from 'react-router'

import {useProducts} from '../../context/ProductsContext'

import './index.css'

const categories = [
  {
    name: 'Electronics',
    value: 'electronics',
    description:
      'Discover smartphones, laptops, tablets and more.',
    icon: '💻',
  },
  {
    name: 'Clothing',
    value: 'clothing',
    description:
      'Explore stylish clothing for everyday wear.',
    icon: '👕',
  },
  {
    name: 'Footwear',
    value: 'footwear',
    description:
      'Find shoes and footwear for every occasion.',
    icon: '👟',
  },
  {
    name: 'Accessories',
    value: 'accessories',
    description:
      'Complete your look with watches, bags and more.',
    icon: '⌚',
  },
]

const Categories = () => {
  const navigate = useNavigate()

  const {
    products,
    selectCategory,
  } = useProducts()

  const handleCategoryClick = category => {
    selectCategory(category)
    navigate('/products')
  }

  const getProductCount = category => {
    const categoryProducts = {
      electronics: [
        'smartphones',
        'tablets',
        'laptops',
        'mobile-accessories',
      ],
      clothing: [
        'mens-shirts',
        'womens-dresses',
        'tops',
      ],
      footwear: [
        'mens-shoes',
        'womens-shoes',
      ],
      accessories: [
        'womens-bags',
        'mens-watches',
        'womens-watches',
        'sunglasses',
        'womens-jewellery',
      ],
    }

    return products.filter(product =>
      categoryProducts[category]?.includes(
        product.category,
      ),
    ).length
  }

  return (
    <main className="categories-page">

      {/* Hero */}
      <section className="categories-hero">
        <div className="categories-container">

          <div className="categories-hero-content">

            <p className="categories-label">
              SHOP BY CATEGORY
            </p>

            <h1>
              Find What You
              <br />
              <span>Love.</span>
            </h1>

            <p className="categories-hero-description">
              Explore our carefully organized collections
              and discover products that match your style,
              needs and lifestyle.
            </p>

            <div className="categories-hero-stats">
              <div>
                <strong>{products.length}+</strong>
                <span>Products</span>
              </div>

              <div>
                <strong>4</strong>
                <span>Categories</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Shopping</span>
              </div>
            </div>

          </div>

          <div className="categories-hero-visual">
            <div className="hero-circle hero-circle-one"></div>
            <div className="hero-circle hero-circle-two"></div>

            <div className="hero-category-card hero-card-one">
              <span>💻</span>
              <strong>Tech</strong>
              <small>Smart devices</small>
            </div>

            <div className="hero-category-card hero-card-two">
              <span>👟</span>
              <strong>Style</strong>
              <small>Latest trends</small>
            </div>

            <div className="hero-category-card hero-card-three">
              <span>⌚</span>
              <strong>Accessories</strong>
              <small>Complete your look</small>
            </div>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="categories-container">

          <div className="categories-section-header">

            <div>
              <p className="categories-section-label">
                EXPLORE COLLECTIONS
              </p>

              <h2>Shop by Category</h2>
            </div>

            <p>
              Choose a category to discover products
              tailored to your interests.
            </p>

          </div>

          <div className="categories-grid">

            {categories.map(category => {
              const productCount =
                getProductCount(category.value)

              return (
                <button
                  type="button"
                  key={category.value}
                  className={`category-card category-${category.value}`}
                  onClick={() =>
                    handleCategoryClick(
                      category.value,
                    )
                  }
                >

                  <div className="category-card-top">

                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <span className="category-arrow">
                      ↗
                    </span>

                  </div>

                  <div className="category-card-content">

                    <p className="category-product-count">
                      {productCount} Products
                    </p>

                    <h3>{category.name}</h3>

                    <p className="category-description">
                      {category.description}
                    </p>

                    <span className="category-explore">
                      Explore Products
                      <span>→</span>
                    </span>

                  </div>

                </button>
              )
            })}

          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="category-benefits">
        <div className="categories-container">

          <div className="benefits-header">

            <p className="categories-section-label">
              WHY SHOP BY CATEGORY?
            </p>

            <h2>
              Everything you need,
              <br />
              <span>in one place.</span>
            </h2>

          </div>

          <div className="benefits-grid">

            <article className="benefit-card">
              <div className="benefit-icon">
                🔎
              </div>

              <h3>Easy Discovery</h3>

              <p>
                Find the products you need faster with
                clearly organized categories.
              </p>
            </article>

            <article className="benefit-card">
              <div className="benefit-icon">
                🎯
              </div>

              <h3>Relevant Products</h3>

              <p>
                Category filtering helps you focus on
                products that matter to you.
              </p>
            </article>

            <article className="benefit-card">
              <div className="benefit-icon">
                ⚡
              </div>

              <h3>Fast Shopping</h3>

              <p>
                Move from discovery to product details
                and checkout with fewer steps.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="categories-cta">
        <div className="categories-container">

          <div className="categories-cta-content">

            <div>
              <p>READY TO EXPLORE?</p>

              <h2>
                Start discovering
                something great.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                selectCategory('all')
                navigate('/products')
              }}
            >
              View All Products →
            </button>

          </div>

        </div>
      </section>

    </main>
  )
}

export default Categories
