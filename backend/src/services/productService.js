const API_URL = 'https://dummyjson.com/products?limit=100'

export const getProducts = async () => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()

  return data.products.map(product => ({
    id: product.id,
    name: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    rating: product.rating,
    image: product.thumbnail,
    images: product.images,
    discountPercentage: product.discountPercentage,
    brand: product.brand,
    stock: product.stock,
    availabilityStatus: product.availabilityStatus,
  }))
}
export const getProductById = async id => {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`,
  )

  if (!response.ok) {
    throw new Error('Product not found')
  }

  const product = await response.json()

  return {
    id: product.id,
    name: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    rating: product.rating,
    image: product.thumbnail,
    images: product.images,
    discountPercentage: product.discountPercentage,
    brand: product.brand,
    stock: product.stock,
    availabilityStatus: product.availabilityStatus,
  }
}