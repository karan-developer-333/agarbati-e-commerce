import { createContext, useContext, useState, useCallback } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  const [user, setUser] = useState({
    name: 'Karan Sharma',
    email: 'karan@sugandh.com',
    phone: '9876543210',
    address: '123 Dev Lane, Apt 4B',
    city: 'Bangalore',
    pincode: '560001',
    points: 320,
    tier: 'Saffron Gold VIP'
  })

  const [orders, setOrders] = useState([
    {
      id: 'SUG-8371-2026',
      date: '2026-06-20',
      total: 398,
      status: 'Delivered',
      items: [
        { name: 'Divine Sandalwood Agarbatti', qty: 2, price: 149 },
        { name: 'Mogra Bliss Agarbatti', qty: 1, price: 100 }
      ]
    },
    {
      id: 'SUG-2910-2026',
      date: '2026-06-25',
      total: 149,
      status: 'In Transit',
      items: [
        { name: 'Royal Rose Agarbatti', qty: 1, price: 149 }
      ]
    }
  ])

  const addOrder = useCallback((items, totalAmount, shippingDetails) => {
    const today = new Date().toISOString().split('T')[0]
    const randomId = `SUG-${Math.floor(1000 + Math.random() * 9000)}-2026`
    
    const newOrder = {
      id: randomId,
      date: today,
      total: totalAmount,
      status: 'In Transit',
      items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price }))
    }

    setOrders(prev => [newOrder, ...prev])
    
    // Add rewards points for the order (10 points per ₹100 spent)
    const pointsEarned = Math.floor(totalAmount / 10)
    setUser(prev => ({
      ...prev,
      points: prev.points + pointsEarned
    }))

    return randomId
  }, [])

  const updateProfile = useCallback((updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields
    }))
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      orders,
      isProfileOpen,
      setIsProfileOpen,
      addOrder,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
