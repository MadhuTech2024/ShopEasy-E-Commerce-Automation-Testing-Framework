
import {useProducts} from '../../context/ProductsContext'



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
  const {selectCategory} = useProducts()

  const handleCategoryClick = category => {
    selectCategory(category)
  }

  return (
    <main className="categories-page">
      <div className="categories-container">
        <div className="categories-header">
          <p className="categories-label">
            SHOP BY CATEGORY
          </p>

          <h1>Explore Our Categories</h1>

          <p>
            Find exactly what you are looking for from
            our collection of products.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <button
              type="button"
              key={category.value}
              className="category-card"
              onClick={() =>
                handleCategoryClick(category.value)
              }
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h2>{category.name}</h2>

              <p>{category.description}</p>

              <span>
                Explore Products →
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Categories

