import {useProducts} from '../../context/ProductsContext'
import './index.css'

const SearchBar = () => {
  const {searchQuery, setSearchQuery} = useProducts()

  const handleSubmit = event => {
    event.preventDefault()
  }

  const handleChange = event => {
    setSearchQuery(event.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const handlePopularSearch = value => {
    setSearchQuery(value)
  }

  return (
    <section className="search-section">
      <div className="search-container">
        <form
          className="search-form"
          onSubmit={handleSubmit}
        >
          <div className="search-input-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search for products..."
              className="search-input"
            />

            {searchQuery && (
              <button
                type="button"
                className="clear-search-button"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            className="search-button"
          >
            Search
          </button>
        </form>

        <div className="popular-searches">
          <span>Popular:</span>

          <button
            type="button"
            onClick={() => handlePopularSearch('phone')}
          >
            Phones
          </button>

          <button
            type="button"
            onClick={() => handlePopularSearch('laptop')}
          >
            Laptops
          </button>

          <button
            type="button"
            onClick={() => handlePopularSearch('shoes')}
          >
            Shoes
          </button>

          <button
            type="button"
            onClick={() => handlePopularSearch('watch')}
          >
            Watches
          </button>
        </div>
      </div>
    </section>
  )
}

export default SearchBar