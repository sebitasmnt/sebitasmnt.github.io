import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/styles.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
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
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(formData.email, formData.password)

    setLoading(false)
    if (result.success) {
      // Redirigir a admin si es administrador, sino al home
      if (result.user?.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      setError(result.message)
    }
  }

  return (
    <main className="main">
      <div className="card">
        <h1 className="title">Iniciar Sesión</h1>
        <p className="muted">Ingresa tus credenciales para continuar.</p>

        {error && (
          <div className="error-message" style={{
            color: '#c0392b',
            marginBottom: '1em',
            padding: '10px',
            backgroundColor: 'rgba(192, 57, 43, 0.1)',
            borderRadius: '5px',
            border: '1px solid #c0392b'
          }}>
            {error}
          </div>
        )}

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="col-2">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="col-2">
            <label htmlFor="password">Contraseña</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="col-2 actions">
            <Link className="btn btn--ghost" to="/registro">¿No tienes cuenta?</Link>
            <button className="btn btn--primary" type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login
