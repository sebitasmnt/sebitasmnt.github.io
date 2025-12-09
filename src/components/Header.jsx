import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { getTotalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout()
    }
  }

  return (
    <header>
      <div className="logo">🎮 Level-Up Gamer</div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/comunidad">Comunidad</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li>
            <Link to="/carrito">
              <i className="fa-solid fa-cart-plus"></i>
              <span id="carritoCount">{getTotalItems()}</span>
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              {user?.rol === 'admin' && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li><Link to="/perfil">Perfil</Link></li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  <i className="fa-solid fa-sign-out-alt"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registro">Registro</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

