import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.codigo === action.payload.codigo)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.codigo === action.payload.codigo
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.codigo !== action.payload)
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.codigo === action.payload.codigo
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      }
    
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Cargar carrito del localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('carrito')
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) })
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (producto) => {
    dispatch({ type: 'ADD_TO_CART', payload: producto })
  }

  const removeFromCart = (codigo) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: codigo })
  }

  const updateQuantity = (codigo, quantity) => {
    if (quantity <= 0) {
      removeFromCart(codigo)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { codigo, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.precio * item.quantity), 0)
  }

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
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
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

