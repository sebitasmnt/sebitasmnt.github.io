import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Perfil = () => {
  const { user, updateProfile, changePassword, logout } = useAuth()
  const { items } = useCart()
  const [activeTab, setActiveTab] = useState('personal')
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [preferences, setPreferences] = useState({
    newsletter: false,
    notifications: true,
    theme: 'dark'
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    if (user) {
      setPersonalData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || ''
      })
      setPreferences(user.preferences || {
        newsletter: false,
        notifications: true,
        theme: 'dark'
      })
    }
  }, [user])

  const showMessage = (msg, type) => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handlePersonalSubmit = (e) => {
    e.preventDefault()
    const result = updateProfile(user.id, personalData)
    if (result.success) {
      showMessage('Información personal actualizada exitosamente', 'success')
    } else {
      showMessage(result.message, 'error')
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('Las contraseñas no coinciden', 'error')
      return
    }
    
    const result = changePassword(user.id, passwordData.currentPassword, passwordData.newPassword)
    if (result.success) {
      showMessage('Contraseña cambiada exitosamente', 'success')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      showMessage(result.message, 'error')
    }
  }

  const handlePreferencesSubmit = (e) => {
    e.preventDefault()
    const result = updateProfile(user.id, { preferences })
    if (result.success) {
      showMessage('Preferencias actualizadas exitosamente', 'success')
    } else {
      showMessage(result.message, 'error')
    }
  }

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout()
    }
  }

  if (!user) {
    return <div>Cargando...</div>
  }

  return (
    <main className="main">
      <div className="profile-container">
        {/* Información del perfil */}
        <div className="card profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src="https://via.placeholder.com/150/1E90FF/FFFFFF?text=U" 
                alt="Avatar del usuario"
                id="profileAvatar"
              />
            </div>
            <div className="profile-info">
              <h1>{user.firstName} {user.lastName}</h1>
              <p>{user.email}</p>
              <p className={`role-badge ${user.role}`}>
                {user.role === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat">
              <i className="fa-solid fa-shopping-bag"></i>
              <span>{items.length}</span>
              <small>Productos en carrito</small>
            </div>
            <div className="stat">
              <i className="fa-solid fa-calendar"></i>
              <span>{new Date(user.createdAt).toLocaleDateString('es-CL')}</span>
              <small>Miembro desde</small>
            </div>
            <div className="stat">
              <i className="fa-solid fa-star"></i>
              <span>1</span>
              <small>Nivel</small>
            </div>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <i className="fa-solid fa-user"></i>
            Información Personal
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <i className="fa-solid fa-lock"></i>
            Seguridad
          </button>
          <button 
            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <i className="fa-solid fa-cog"></i>
            Preferencias
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="tab-content">
          {message && (
            <div 
              className="notification"
              style={{ 
                color: messageType === 'error' ? '#c0392b' : '#27ae60',
                marginBottom: '1em',
                padding: '10px',
                backgroundColor: messageType === 'error' ? 'rgba(192, 57, 43, 0.1)' : 'rgba(39, 174, 96, 0.1)',
                borderRadius: '5px',
                border: `1px solid ${messageType === 'error' ? '#c0392b' : '#27ae60'}`
              }}
            >
              {message}
            </div>
          )}

          {/* Información Personal */}
          {activeTab === 'personal' && (
            <div className="card">
              <h2>Información Personal</h2>
              <form className="form-grid" onSubmit={handlePersonalSubmit}>
                <div className="col-2">
                  <label htmlFor="firstName">Nombre</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    value={personalData.firstName}
                    onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                  />
                </div>
                
                <div className="col-2">
                  <label htmlFor="lastName">Apellido</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    value={personalData.lastName}
                    onChange={(e) => setPersonalData({...personalData, lastName: e.target.value})}
                  />
                </div>
                
                <div className="col-2">
                  <label htmlFor="phone">Teléfono</label>
                  <input 
                    className="input" 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                  />
                </div>
                
                <div className="col-2">
                  <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
                  <input 
                    className="input" 
                    type="date" 
                    id="dateOfBirth" 
                    name="dateOfBirth"
                    value={personalData.dateOfBirth}
                    onChange={(e) => setPersonalData({...personalData, dateOfBirth: e.target.value})}
                  />
                </div>
                
                <div className="col-2">
                  <label htmlFor="address">Dirección</label>
                  <textarea 
                    className="input" 
                    id="address" 
                    name="address" 
                    rows="3"
                    value={personalData.address}
                    onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                  ></textarea>
                </div>
                
                <div className="col-2 actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setActiveTab('')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn--primary">Guardar Cambios</button>
                </div>
              </form>
            </div>
          )}

          {/* Seguridad */}
          {activeTab === 'security' && (
            <div className="card">
              <h2>Cambiar Contraseña</h2>
              <form className="form-grid" onSubmit={handlePasswordSubmit}>
                <div className="col-2">
                  <label htmlFor="currentPassword">Contraseña Actual</label>
                  <input 
                    className="input" 
                    type="password" 
                    id="currentPassword" 
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-2">
                  <label htmlFor="newPassword">Nueva Contraseña</label>
                  <input 
                    className="input" 
                    type="password" 
                    id="newPassword" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-2">
                  <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                  <input 
                    className="input" 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-2 actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setActiveTab('')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn--primary">Cambiar Contraseña</button>
                </div>
              </form>
            </div>
          )}

          {/* Preferencias */}
          {activeTab === 'preferences' && (
            <div className="card">
              <h2>Preferencias</h2>
              <form className="form-grid" onSubmit={handlePreferencesSubmit}>
                <div className="col-2">
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      name="newsletter"
                      checked={preferences.newsletter}
                      onChange={(e) => setPreferences({...preferences, newsletter: e.target.checked})}
                    />
                    <label htmlFor="newsletter">Recibir newsletter con ofertas especiales</label>
                  </div>
                </div>
                
                <div className="col-2">
                  <div className="checkbox-group">
                    <input 
                      type="checkbox" 
                      id="notifications" 
                      name="notifications"
                      checked={preferences.notifications}
                      onChange={(e) => setPreferences({...preferences, notifications: e.target.checked})}
                    />
                    <label htmlFor="notifications">Recibir notificaciones de pedidos</label>
                  </div>
                </div>
                
                <div className="col-2">
                  <label htmlFor="theme">Tema</label>
                  <select 
                    className="input" 
                    id="theme" 
                    name="theme"
                    value={preferences.theme}
                    onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                  >
                    <option value="dark">Oscuro</option>
                    <option value="light">Claro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
                
                <div className="col-2 actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setActiveTab('')}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn--primary">Guardar Preferencias</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Botón de logout */}
        <div className="logout-section">
          <button className="btn btn--ghost" onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt"></i>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </main>
  )
}

export default Perfil
