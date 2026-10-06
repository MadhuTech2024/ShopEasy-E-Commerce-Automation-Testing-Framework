import {useState} from 'react'
import {useProducts} from '../../context/ProductsContext'
import './index.css'

const categoryData = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      'Mobiles',
      'Laptops',
      'Audio',
      'Cameras',
      'Accessories',
    ],
  },
  {
    id: 'clothing',
    name: 'Clothing',
    subcategories: ['Men', 'Women', 'Kids'],
  },
  {
    id: 'footwear',
    name: 'Footwear',
    subcategories: ['Sneakers', 'Sports', 'Casual'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    subcategories: [
      'Bags',
      'Watches',
      'Sunglasses',
    ],
  },
]

const ratings = [
  {
    id: 5,
    stars: '★★★★★',
    label: '5.0',
  },
  {
    id: 4,
    stars: '★★★★☆',
    label: '4.0 & above',
  },
  {
    id: 3,
    stars: '★★★☆☆',
    label: '3.0 & above',
  },
]

const FilterSidebar = ({onClose}) => {
  const {
    selectedCategories: appliedCategories,
    minRating: appliedRating,
    maxPrice: appliedMaxPrice,
    setSelectedCategories,
    setMinRating,
    setMaxPrice,
    clearFilters,
    activeFilterCount,
  } = useProducts()

  // -----------------------------
  // SIDEBAR UI STATE
  // -----------------------------

  const [expandedCategories, setExpandedCategories] =
    useState(['electronics'])

  // Temporary filters
  const [selectedCategories, setSelectedCategoriesLocal] =
    useState(appliedCategories)

  const [selectedRating, setSelectedRating] =
    useState(appliedRating || null)

  const [price, setPrice] = useState(
    appliedMaxPrice || 5000,
  )

  // -----------------------------
  // CATEGORY EXPAND / COLLAPSE
  // -----------------------------

  const toggleCategory = categoryId => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      }

      return [...prev, categoryId]
    })
  }

  // -----------------------------
  // SUBCATEGORY
  // -----------------------------

  const toggleSubcategory = subcategory => {
    setSelectedCategoriesLocal(prev => {
      if (prev.includes(subcategory)) {
        return prev.filter(item => item !== subcategory)
      }

      return [...prev, subcategory]
    })
  }

  // -----------------------------
  // CLEAR ALL
  // -----------------------------

  const clearAllFilters = () => {
    setSelectedCategoriesLocal([])
    setSelectedRating(null)
    setPrice(5000)

    clearFilters()
  }

  // -----------------------------
  // APPLY FILTERS
  // -----------------------------

  const applyFilters = () => {
    setSelectedCategories(selectedCategories)

    setMinRating(selectedRating || 0)

    setMaxPrice(price)

    onClose()
  }

  // -----------------------------
  // ACTIVE FILTER COUNT
  // -----------------------------

  const localActiveFilterCount =
    selectedCategories.length +
    (selectedRating ? 1 : 0) +
    (price < 5000 ? 1 : 0)

  return (
    <>
      {/* Background overlay */}

      <div
        className="filter-overlay"
        onClick={onClose}
      ></div>

      {/* Sidebar */}

      <aside className="filter-sidebar">
        {/* Header */}

        <div className="filter-header">
          <div className="filter-title-wrapper">
            <span className="filter-label">
              SHOP
            </span>

            <h2>All Categories</h2>

            {localActiveFilterCount > 0 && (
              <span className="active-filter-text">
                {localActiveFilterCount} filters selected
              </span>
            )}
          </div>

          <button
            type="button"
            className="close-filter-button"
            onClick={onClose}
            aria-label="Close categories"
          >
            ×
          </button>
        </div>

        {/* Categories */}

        <div className="filter-section">
          <div className="filter-section-title">
            Categories
          </div>

          <div className="category-filter-list">
            {categoryData.map(category => {
              const isExpanded =
                expandedCategories.includes(category.id)

              return (
                <div
                  className="filter-category"
                  key={category.id}
                >
                  <button
                    type="button"
                    className="category-heading"
                    onClick={() =>
                      toggleCategory(category.id)
                    }
                  >
                    <span className="category-name">
                      {category.name}
                    </span>

                    <span
                      className={`category-arrow ${
                        isExpanded ? 'expanded' : ''
                      }`}
                    >
                      ›
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="subcategory-list">
                      {category.subcategories.map(
                        subcategory => (
                          <label
                            className="subcategory-item"
                            key={subcategory}
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(
                                subcategory,
                              )}
                              onChange={() =>
                                toggleSubcategory(
                                  subcategory,
                                )
                              }
                            />

                            <span className="custom-checkbox"></span>

                            <span>
                              {subcategory}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Price */}

        <div className="filter-section">
          <div className="filter-section-heading">
            <span>Price</span>

            <strong>
                 ${price.toLocaleString('en-US')}
            </strong>
          </div>

          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={price}
            onChange={event =>
              setPrice(Number(event.target.value))
            }
            className="price-slider"
         />
         </div>

<div className="price-range-labels">
  <span>$500</span>
  <span>$5,000+</span>
</div>

        {/* Rating */}

        <div className="filter-section">
          <div className="filter-section-title">
            Customer Rating
          </div>

          <div className="rating-filter-list">
            {ratings.map(rating => (
              <label
                className="rating-item"
                key={rating.id}
              >
                <input
                  type="radio"
                  name="rating"
                  checked={
                    selectedRating === rating.id
                  }
                  onChange={() =>
                    setSelectedRating(rating.id)
                  }
                />

                <span className="custom-radio"></span>

                <span className="rating-stars">
                  {rating.stars}
                </span>

                <span className="rating-label">
                  {rating.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Bottom actions */}

        <div className="filter-actions">
          <button
            type="button"
            className="clear-filter-button"
            onClick={clearAllFilters}
          >
            Clear All
          </button>

          <button
            type="button"
            className="apply-filter-button"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  )
  }

export default FilterSidebar