import {useProducts} from '../../context/ProductsContext'
import './index.css'

const SortDropdown = () => {
  const {sortOption, setSortOption} = useProducts()

  const handleSortChange = event => {
    setSortOption(event.target.value)
  }

  return (
    <div className="sort-container">
      <label htmlFor="sort-products">Sort By:</label>

      <select
        id="sort-products"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="relevance">Relevance</option>
        <option value="price-low-high">
          Price: Low → High
        </option>
        <option value="price-high-low">
          Price: High → Low
        </option>
        <option value="rating-high-low">
          Rating: High → Low
        </option>
        <option value="discount-high-low">
          Discount: High → Low
        </option>
      </select>
    </div>
  )
}

export default SortDropdown