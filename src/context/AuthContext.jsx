import { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch({ type: 'LOGIN', payload: user });
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const user = {
        id: data.id,
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
        rol: data.rol,
        descuentoDuoc: data.descuentoDuoc
      };
      dispatch({ type: 'LOGIN', payload: user });
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al iniciar sesión'
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.registro(userData);
      const user = {
        id: data.id,
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
        rol: data.rol,
        descuentoDuoc: data.descuentoDuoc
      };
      dispatch({ type: 'LOGIN', payload: user });
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al registrar'
      };
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData) => {
    try {
      const data = await userService.actualizarPerfil(userData);
      const updatedUser = {
        ...state.user,
        ...data
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al actualizar'
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await userService.cambiarPassword({
        currentPassword,
        newPassword
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.mensaje || 'Error al cambiar contraseña'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
