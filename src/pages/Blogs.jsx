import React from 'react'

const Blogs = () => {
  return (
    <div className="blog-container">
      <div className="blog-post">
        <img src="/assets/img/smash_torneo.avif" alt="Torneo Smash" />
        <h3>Torneo de Smash Bros Ultimate</h3>
        <p>Únete a nuestro torneo mensual de Super Smash Bros Ultimate. Premios increíbles y mucha diversión te esperan.</p>
        <button className="btn-blog">Leer más</button>
      </div>
      <div className="blog-post">
        <img src="/assets/img/polera.png" alt="Nuevos productos" />
        <h3>Nuevos Productos Gaming</h3>
        <p>Descubre los últimos lanzamientos en gaming y tecnología. Mantente actualizado con las últimas tendencias.</p>
        <button className="btn-blog">Leer más</button>
      </div>
    </div>
  )
}

export default Blogs

