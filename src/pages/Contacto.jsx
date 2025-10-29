import React, { useState } from 'react'

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData)
    alert('¡Mensaje enviado! Te contactaremos pronto.')
    setFormData({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <section className="contacto">
      <h2>Contacto</h2>
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="input"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            className="input"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
          
          <button type="submit" className="btn">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  )
}

export default Contacto

