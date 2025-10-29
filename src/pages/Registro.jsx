import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    edad: '',
    direccion: '',
    comuna: '',
    region: 'RM',
    password: '',
    confirmarPassword: ''
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar contraseñas
    if (formData.password !== formData.confirmarPassword) {
      setMessage('Las contraseñas no coinciden')
      setMessageType('error')
      return
    }

    const result = register(formData)
    
    if (result.success) {
      setMessage(result.message)
      setMessageType('success')
      // Redirigir después de un breve delay
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      setMessage(result.message)
      setMessageType('error')
    }
  }

  return (
    <main className="main">
      <div className="card">
        <h1 className="title">Crear cuenta</h1>
        <p className="muted">Regístrate para guardar tus pedidos y recibir ofertas.</p>
        
        {message && (
          <div 
            className="message" 
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
        
        <form className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input 
              className="input" 
              id="nombre" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required 
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido</label>
            <input 
              className="input" 
              id="apellido" 
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              className="input" 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono</label>
            <input 
              className="input" 
              type="tel" 
              placeholder="+56 9 ..." 
              id="telefono" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="edad">Edad</label>
            <input 
              className="input" 
              type="number" 
              min="0" 
              id="edad" 
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required 
            />
          </div>
          <div>
            <label htmlFor="direccion">Dirección</label>
            <input 
              className="input" 
              id="direccion" 
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="comuna">Comuna</label>
            <input 
              className="input" 
              id="comuna" 
              name="comuna"
              value={formData.comuna}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="region">Región</label>
            <select 
              className="input" 
              id="region" 
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="RM">RM</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input 
              className="input" 
              type="password" 
              required 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmarPassword">Confirmar</label>
            <input 
              className="input" 
              type="password" 
              required 
              id="confirmarPassword" 
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
            />
          </div>
          <div className="col-2 actions">
            <Link className="btn btn--ghost" to="/login">¿Ya tienes cuenta?</Link>
            <button className="btn btn--primary" type="submit">Crear cuenta</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Registro
