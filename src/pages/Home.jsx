import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section id="inicio" className="hero">
        <h1>¡Desafía tus límites con <span>Level-Up Gamer</span>!</h1>
        <p>Conviértete en el héroe de tu propia historia. Explora, juega y gana con nosotros.</p>
        <Link to="/productos" className="btn">Explorar Catálogo</Link>
      </section>

      {/* Misión y Visión */}
      <section className="info">
        <div className="card">
          <h2>Misión</h2>
          <p>Proporcionar productos de alta calidad para gamers en todo Chile, con una experiencia de compra única y personalizada.</p>
        </div>
        <div className="card">
          <h2>Visión</h2>
          <p>Ser la tienda online líder en Chile, reconocida por innovación, servicio excepcional y un programa de fidelización basado en gamificación.</p>
        </div>
      </section>
    </>
  )
}

export default Home

