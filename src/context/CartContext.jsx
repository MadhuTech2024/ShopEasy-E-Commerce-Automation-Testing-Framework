
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export const CartContext = createContext(null)

const CART_STORAGE_KEY = 'shopeasy_cart'

export const CartProvider = ({ children }) => {
  // Restore cart items when the application starts.
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)

      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Unable to restore cart:', error)
      return []
    }
  })

  // Save cart items whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems),
      )
    } catch (error) {
      console.error('Unable to save cart:', error)
    }
  }, [cartItems])

  const addToCart = product => {
    setCartItems(previousItems => {
      const existingItem = previousItems.find(
        item => String(item.id) === String(product.id),
      )

      if (existingItem) {
        return previousItems.map(item =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }

      return [
        ...previousItems,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = productId => {
    setCartItems(previousItems =>
      previousItems.filter(
        item => String(item.id) !== String(productId),
      ),
    )
  }

  const increaseQuantity = productId => {
    setCartItems(previousItems =>
      previousItems.map(item =>
        String(item.id) === String(productId)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }

  const decreaseQuantity = productId => {
    setCartItems(previousItems =>
      previousItems
        .map(item =>
          String(item.id) === String(productId)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartItemCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems],
  )

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price) * item.quantity,
        0,
      ),
    [cartItems],
  )

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider',
    )
  }

  return context
}

export default CartProvider
