import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

const CartContext = createContext(null)

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = product => {
    setCartItems(previousItems => {
      const existingItem = previousItems.find(
        item => item.id === product.id,
      )

      if (existingItem) {
        return previousItems.map(item =>
          item.id === product.id
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
      previousItems.filter(item => item.id !== productId),
    )
  }

  const increaseQuantity = productId => {
    setCartItems(previousItems =>
      previousItems.map(item =>
        item.id === productId
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
          item.id === productId
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