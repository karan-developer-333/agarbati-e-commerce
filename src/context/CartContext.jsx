import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === product.name)
      if (existing) return prev.map(i => i.name === product.name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const updateQty = useCallback((productName, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.name !== productName))
    } else {
      setItems(prev => prev.map(i => i.name === productName ? { ...i, qty } : i))
    }
  }, [])

  const removeFromCart = useCallback((productName) => {
    setItems(prev => prev.filter(i => i.name !== productName))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const getQty = useCallback((productName) => {
    const item = items.find(i => i.name === productName)
    return item ? item.qty : 0
  }, [items])

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      updateQty, 
      removeFromCart, 
      clearCart,
      itemCount, 
      total, 
      getQty,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

