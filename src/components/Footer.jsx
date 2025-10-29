import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="contacto">
      <div id="contactos">
        <div id="contact-element">
          <div className="logo">
            <img id="imgfooter" src="/assets/img/Controlador y Auriculares Gamer.png" alt="Logo Empresa" />
          </div>
        </div>
        <div id="contact-element">
          <h3>Enlaces del sitio</h3>
          <div id="footer-links">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/comunidad">Comunidad</Link>
          </div>
        </div>
        <div id="contact-element">
          <h3>Nuestros productos</h3>
          <div id="footer-links">
            <Link to="/productos">Juegos de Mesa</Link>
            <Link to="/productos">Accesorios</Link>
            <Link to="/productos">Consolas</Link>
          </div>
        </div>
      </div>
      <div id="endpage">
        <p>&copy; 2025 Level-Up Gamer. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer

