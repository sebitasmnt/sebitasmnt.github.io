import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const adminNavItems = [
    { path: '/admin', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/admin/inventory', icon: 'fas fa-boxes', label: 'Inventory' },
    { path: '/admin/reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { path: '/admin/employees', icon: 'fas fa-users', label: 'Employees' },
    { path: '/admin/customers', icon: 'fas fa-user-friends', label: 'Customers' },
    { path: '/admin/settings', icon: 'fas fa-cog', label: 'Settings' },
    { path: '/admin/profile', icon: 'fas fa-user', label: 'Profile' },
    { path: '/admin/search', icon: 'fas fa-search', label: 'Search' },
    { path: '/admin/help', icon: 'fas fa-question-circle', label: 'Help' }
  ]

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout()
    }
  }

  return (
    <div className="admin-layout">
      {/* Sidebar izquierdo */}
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/assets/img/logo.svg" alt="Level-Up Gamer Logo" />
        </div>
        <nav>
          <ul className="admin-nav">
            {adminNavItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <i className={item.icon}></i> {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Área principal */}
      <main className="admin-main">
        {/* Header superior */}
        <header className="admin-header">
          <h1>Panel de Administración</h1>
          <div className="admin-header-right">
            <div className="notification-icon">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </div>
            <div className="user-info">
              <span>Bienvenido, {user?.firstName}</span>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
