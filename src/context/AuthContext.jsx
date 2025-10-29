import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  // Cargar usuario del localStorage al inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const authStatus = localStorage.getItem('auth')
    
    if (savedUser && authStatus === 'true') {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: 'LOGIN', payload: user })
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('auth')
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = (email, password) => {
    // Credenciales hardcodeadas del proyecto original
    const credentials = {
      user: "admin@levelup.com",
      password: "1234"
    }

    if (email === credentials.user && password === credentials.password) {
      const user = {
        id: '1',
        email: email,
        firstName: 'Admin',
        lastName: 'Level-Up',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('auth', 'true')
      dispatch({ type: 'LOGIN', payload: user })
      return { success: true, user }
    } else {
      return { success: false, message: 'Usuario o contraseña incorrectos' }
    }
  }

  const register = (userData) => {
    // Validar edad mínima
    if (userData.edad < 18) {
      return { success: false, message: 'Debes tener al menos 18 años para registrarte.' }
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.nombre,
      lastName: userData.apellido,
      phone: userData.telefono,
      age: userData.edad,
      address: userData.direccion,
      comuna: userData.comuna,
      region: userData.region,
      role: 'cliente',
      createdAt: new Date().toISOString(),
      preferences: {
        newsletter: false,
        notifications: true,
        theme: 'dark'
      }
    }

    // Guardar usuario en localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Auto-login después del registro
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('auth', 'true')
    dispatch({ type: 'LOGIN', payload: newUser })

    // Mensaje especial para usuarios de Duoc UC
    let message = '¡Cuenta creada!'
    if (userData.email.includes('@duocuc.cl')) {
      message = '¡Cuenta creada! Recibirás un 20% de descuento de por vida en todos los productos por ser parte de Duoc UC.'
    }

    return { success: true, user: newUser, message }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
    dispatch({ type: 'LOGOUT' })
  }

  const updateProfile = (userId, updateData) => {
    if (state.user && state.user.id === userId) {
      const updatedUser = { ...state.user, ...updateData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Actualizar también en la lista de usuarios
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex !== -1) {
        users[userIndex] = updatedUser
        localStorage.setItem('users', JSON.stringify(users))
      }
      
      dispatch({ type: 'UPDATE_USER', payload: updateData })
      return { success: true, user: updatedUser }
    }
    return { success: false, message: 'Usuario no encontrado' }
  }

  const changePassword = (userId, currentPassword, newPassword) => {
    if (state.user && state.user.id === userId) {
      // En un sistema real, aquí verificarías la contraseña actual
      // Por simplicidad, solo validamos la nueva contraseña
      if (newPassword.length < 4) {
        return { success: false, message: 'La nueva contraseña debe tener al menos 4 caracteres' }
      }
      
      return { success: true, message: 'Contraseña cambiada exitosamente' }
    }
    return { success: false, message: 'Usuario no encontrado' }
  }

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    register,
    logout,
    updateProfile,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
