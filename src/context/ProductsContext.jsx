import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {getProducts} from '../services/productService'

import {
  subcategoryMap,
  parentCategoryMap,
} from '../config/categoryConfig'

// Export ProductsContext as a named export
export const ProductsContext = createContext(null)

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 5000
const DEFAULT_MIN_RATING = 0

// Export ProductsProvider as a named export
export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortOption, setSortOption] = useState('relevance')

  // Search
  const [searchQuery, setSearchQuery] = useState('')

  // Categories
  const [selectedCategories, setSelectedCategories] = useState([])

  // Price
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE)
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE)

  // Rating
  const [minRating, setMinRating] = useState(DEFAULT_MIN_RATING)

  // ---------------------------------------
  // FETCH PRODUCTS
  // ---------------------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const data = await getProducts()

        setProducts(data)
        setError('')
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // ---------------------------------------
  // FILTER PRODUCTS
  // ---------------------------------------

  const filteredProducts = useMemo(() => {
    const search = searchQuery.trim().toLowerCase()

    const filtered = products.filter(product => {
      // SEARCH
      const matchesSearch =
        search === '' ||
        product.name?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search)

      // CATEGORY
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(selectedCategory => {
          if (parentCategoryMap[selectedCategory]) {
            return parentCategoryMap[selectedCategory].includes(
              product.category,
            )
          }

          if (subcategoryMap[selectedCategory]) {
            return subcategoryMap[selectedCategory].includes(
              product.category,
            )
          }

          return false
        })

      // PRICE
      const matchesPrice =
        Number(product.price) >= minPrice &&
        Number(product.price) <= maxPrice

      // RATING
      const matchesRating =
        Number(product.rating) >= minRating

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating
      )
    })

    // SORTING
    switch (sortOption) {
      case 'price-low-high':
        return [...filtered].sort(
          (a, b) => Number(a.price) - Number(b.price),
        )

      case 'price-high-low':
        return [...filtered].sort(
          (a, b) => Number(b.price) - Number(a.price),
        )

      case 'rating-high-low':
        return [...filtered].sort(
          (a, b) => Number(b.rating) - Number(a.rating),
        )

      case 'discount-high-low':
        return [...filtered].sort(
          (a, b) =>
            Number(b.discountPercentage) -
            Number(a.discountPercentage),
        )

      case 'relevance':
      default:
        return filtered
    }
  }, [
    products,
    searchQuery,
    selectedCategories,
    minPrice,
    maxPrice,
    minRating,
    sortOption,
  ])

  // ---------------------------------------
  // SELECT CATEGORY
  // ---------------------------------------

  const selectCategory = category => {
    if (category === 'all') {
      setSelectedCategories([])
    } else {
      setSelectedCategories([category])
    }
  }

  // ---------------------------------------
  // TOGGLE CATEGORY
  // ---------------------------------------

  const toggleCategory = category => {
    setSelectedCategories(previous => {
      if (previous.includes(category)) {
        return previous.filter(item => item !== category)
      }

      return [...previous, category]
    })
  }

  // ---------------------------------------
  // CLEAR ALL
  // ---------------------------------------

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setMinPrice(DEFAULT_MIN_PRICE)
    setMaxPrice(DEFAULT_MAX_PRICE)
    setMinRating(DEFAULT_MIN_RATING)
  }

  // ---------------------------------------
  // ACTIVE FILTER COUNT
  // ---------------------------------------

  const activeFilterCount =
    selectedCategories.length +
    (minPrice > DEFAULT_MIN_PRICE ? 1 : 0) +
    (maxPrice < DEFAULT_MAX_PRICE ? 1 : 0) +
    (minRating > DEFAULT_MIN_RATING ? 1 : 0)

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,

        loading,
        error,

        searchQuery,
        setSearchQuery,

        selectedCategories,
        setSelectedCategories,
        selectCategory,
        toggleCategory,

        minPrice,
        setMinPrice,

        maxPrice,
        setMaxPrice,

        minRating,
        setMinRating,

        sortOption,
        setSortOption,

        activeFilterCount,

        clearFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error(
      'useProducts must be used inside ProductsProvider',
    )
  }

  return context
}

export default ProductsProvider