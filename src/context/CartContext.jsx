import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case 'CLEAR_CART':
      return {
        items: [],
        subtotal: 0,
        descuentoMonto: 0,
        total: 0,
        isLoading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    subtotal: 0,
    descuentoMonto: 0,
    total: 0,
    isLoading: false
  });

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await cartService.get();
      console.log('📦 Carrito cargado desde backend:', data);
      console.log('📦 Items en carrito:', data.items);

      // Asegurar que items siempre sea un array
      if (!data.items) {
        console.warn('⚠️ Backend no devolvió items, usando array vacío');
        data.items = [];
      }

      dispatch({ type: 'LOAD_CART', payload: data });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (producto, cantidad = 1) => {
    try {
      await cartService.agregar(producto.id, cantidad);
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al agregar al carrito'
      };
    }
  };

  const updateQuantity = async (itemId, cantidad) => {
    try {
      await cartService.actualizarCantidad(itemId, cantidad);
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Error updating quantity:', error);
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al actualizar cantidad'
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await cartService.eliminarItem(itemId);
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Error removing item:', error);
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al eliminar item'
      };
    }
  };

  const clearCart = async () => {
    try {
      await cartService.vaciar();
      dispatch({ type: 'CLEAR_CART' });
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al vaciar carrito'
      };
    }
  };

  const checkout = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const pedido = await cartService.checkout();
      dispatch({ type: 'CLEAR_CART' });
      return { success: true, pedido };
    } catch (error) {
      console.error('Error during checkout:', error);
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al procesar la compra'
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getTotalItems = () => {
    const total = state.items.reduce((sum, item) => sum + item.cantidad, 0);
    console.log('🛒 Total items en carrito:', total, 'Items:', state.items);
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        subtotal: state.subtotal,
        descuentoMonto: state.descuentoMonto,
        total: state.total,
        isLoading: state.isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout,
        getTotalItems,
        refreshCart: loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};


