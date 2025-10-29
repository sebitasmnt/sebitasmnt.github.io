import React from 'react'

const Comunidad = () => {
  return (
    <section className="comunidad">
      <h2>Comunidad Level-Up Gamer</h2>
      <p>Únete a nuestra comunidad de gamers y comparte tus experiencias.</p>
      <div className="comunidad-content">
        <div className="comunidad-card">
          <h3>Foros de Discusión</h3>
          <p>Participa en nuestras discusiones sobre gaming, hardware y más.</p>
        </div>
        <div className="comunidad-card">
          <h3>Eventos y Torneos</h3>
          <p>Mantente al día con nuestros eventos y torneos especiales.</p>
        </div>
        <div className="comunidad-card">
          <h3>Reviews de Productos</h3>
          <p>Lee y comparte reviews de los productos que amas.</p>
        </div>
      </div>
    </section>
  )
}

export default Comunidad

