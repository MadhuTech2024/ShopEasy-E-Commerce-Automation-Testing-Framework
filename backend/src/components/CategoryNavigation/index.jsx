import {useState} from 'react'
import {useProducts} from '../../context/ProductsContext'
import FilterSidebar from '../FilterSidebar'
import './index.css'

const categories = [
  {
    label: 'All Categories',
    value: 'all',
  },
  {
    label: 'Electronics',
    value: 'electronics',
  },
  {
    label: 'Clothing',
    value: 'clothing',
  },
  {
    label: 'Footwear',
    value: 'footwear',
  },
  {
    label: 'Accessories',
    value: 'accessories',
  },
]

const CategoryNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const {
    selectedCategories,
    selectCategory,
    activeFilterCount,
  } = useProducts()

  const handleCategoryClick = category => {
    if (category.value === 'all') {
      selectCategory('all')
      return
    }

    selectCategory(category.value)

    // Important:
    // Clicking a category should NOT open the sidebar.
    setIsSidebarOpen(false)
  }

  const handleFilterClick = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <section className="category-navigation">
        <div className="category-container">
          <div className="category-list">
            {categories.map(category => {
              const isActive =
                category.value === 'all'
                  ? selectedCategories.length === 0
                  : selectedCategories.includes(category.value)

              return (
                <button
                  key={category.value}
                  type="button"
                  className={`category-button ${
                    isActive ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.label}
                </button>
              )
            })}

            {/* FILTER BUTTON */}
            <button
              type="button"
              className="category-button filter-button"
              onClick={handleFilterClick}
            >
              Filters

              {activeFilterCount > 0 && (
                <span className="filter-count">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SIDEBAR */}
      {isSidebarOpen && (
        <FilterSidebar onClose={handleCloseSidebar} />
      )}
    </>
  )
}

export default CategoryNavigation