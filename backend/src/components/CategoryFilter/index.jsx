import {useState} from 'react'
import './index.css'

const categories = [
  'All',
  'Electronics',
  'Footwear',
  'Clothing',
  'Accessories',
]

const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const onSelectCategory = category => {
    setActiveCategory(category)
  }

  return (
    <section className="category-section" id="categories">
      <div className="category-container">
        <div className="category-header">
          <div>
            <span className="category-label">EXPLORE</span>

            <h2>Shop by Category</h2>

            <p>
              Browse our products by category and find exactly what
              you're looking for.
            </p>
          </div>
        </div>

        <div className="category-list">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              className={`category-button ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryFilter