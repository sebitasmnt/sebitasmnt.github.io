import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <div className="logo">
            <img className="footer-logo" src="/assets/img/Controlador y Auriculares Gamer.png" alt="Logo Empresa" />
          </div>
        </div>
        <div className="footer-section">
          <h3>Enlaces del sitio</h3>
          <div className="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/comunidad">Comunidad</Link>
          </div>
        </div>
        <div className="footer-section">
          <h3>Nuestros productos</h3>
          <div className="footer-links">
            <Link to="/productos">Juegos de Mesa</Link>
            <Link to="/productos">Accesorios</Link>
            <Link to="/productos">Consolas</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Level-Up Gamer. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer

