import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import api from '../services/api'

const AdminNewProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockMinimo: '10',
    categoriaId: '',
    imagenUrl: '',
    destacado: false,
    activo: true
  })

  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingCategorias, setLoadingCategorias] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  // Cargar categorías del backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/api/categorias')
        setCategorias(response.data)
      } catch (error) {
        console.error('Error loading categories:', error)
        setMessage('Error al cargar categorías')
        setMessageType('error')
      } finally {
        setLoadingCategorias(false)
      }
    }

    fetchCategorias()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.codigo || formData.codigo.length < 3) {
      setMessage('El código del producto debe tener al menos 3 caracteres')
      setMessageType('error')
      return
    }

    if (!formData.nombre) {
      setMessage('El nombre del producto es requerido')
      setMessageType('error')
      return
    }

    if (!formData.precio || parseFloat(formData.precio) < 0) {
      setMessage('El precio debe ser mayor o igual a 0')
      setMessageType('error')
      return
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      setMessage('El stock debe ser mayor o igual a 0')
      setMessageType('error')
      return
    }

    if (!formData.categoriaId) {
      setMessage('Debe seleccionar una categoría')
      setMessageType('error')
      return
    }

    try {
      setLoading(true)
      setMessage('')

      // Preparar datos para enviar al backend
      const productData = {
        codigo: formData.codigo,
        nombre: formData.nombre,
        descripcion: formData.descripcion || '',
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        stockMinimo: parseInt(formData.stockMinimo) || 10,
        categoria: {
          id: parseInt(formData.categoriaId)
        },
        imagenUrl: formData.imagenUrl || '/img/default-product.png',
        destacado: formData.destacado,
        activo: formData.activo
      }

      // Enviar al backend
      const response = await api.post('/api/productos/crear', productData)

      setMessage('✓ Producto creado exitosamente')
      setMessageType('success')

      // Resetear formulario después de 1.5 segundos y redirigir
      setTimeout(() => {
        navigate('/admin')
      }, 1500)

    } catch (error) {
      console.error('Error creating product:', error)
      const errorMessage = error.response?.data?.mensaje ||
        error.response?.data?.message ||
        'Error al crear el producto'
      setMessage(`✗ ${errorMessage}`)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const isStockCritical = formData.stock && formData.stockMinimo &&
    parseInt(formData.stock) <= parseInt(formData.stockMinimo)

  if (loadingCategorias) {
    return (
      <AdminLayout>
        <div className="form-container">
          <h2>Cargando...</h2>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="form-container">
        <div className="form-header">
          <h2>NUEVO PRODUCTO</h2>
        </div>

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

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Código Producto */}
            <div className="form-group">
              <label htmlFor="codigo">Código Producto <span className="required">*</span></label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                minLength="3"
                value={formData.codigo}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <small className="form-help">Mínimo 3 caracteres (ej: PS5-001)</small>
            </div>

            {/* Nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre <span className="required">*</span></label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                maxLength="100"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <small className="form-help">Máximo 100 caracteres</small>
            </div>

            {/* Descripción */}
            <div className="form-group full-width">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                maxLength="500"
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
                disabled={loading}
              ></textarea>
              <small className="form-help">Opcional. Máximo 500 caracteres</small>
            </div>

            {/* Precio */}
            <div className="form-group">
              <label htmlFor="precio">Precio <span className="required">*</span></label>
              <input
                type="number"
                id="precio"
                name="precio"
                min="0"
                step="0.01"
                value={formData.precio}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <small className="form-help">Mínimo: 0 (producto FREE). Puede ser decimal</small>
            </div>

            {/* Stock */}
            <div className="form-group">
              <label htmlFor="stock">Stock <span className="required">*</span></label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <small className="form-help">Cantidad en inventario. Solo números enteros</small>
            </div>

            {/* Stock Mínimo */}
            <div className="form-group">
              <label htmlFor="stockMinimo">Stock Mínimo</label>
              <input
                type="number"
                id="stockMinimo"
                name="stockMinimo"
                min="0"
                value={formData.stockMinimo}
                onChange={handleChange}
                disabled={loading}
              />
              <small className="form-help">Alerta cuando stock ≤ este valor (default: 10)</small>
            </div>

            {/* Categorías */}
            <div className="form-group">
              <label htmlFor="categoriaId">Categoría <span className="required">*</span></label>
              <select
                id="categoriaId"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* URL de Imagen */}
            <div className="form-group">
              <label htmlFor="imagenUrl">URL de Imagen</label>
              <input
                type="text"
                id="imagenUrl"
                name="imagenUrl"
                placeholder="/img/productos/producto.jpg"
                value={formData.imagenUrl}
                onChange={handleChange}
                disabled={loading}
              />
              <small className="form-help">Opcional. Ruta relativa o URL completa</small>
            </div>

            {/* Destacado */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Producto Destacado</span>
              </label>
              <small className="form-help">Aparecerá en la sección de destacados</small>
            </div>

            {/* Activo */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span>Producto Activo</span>
              </label>
              <small className="form-help">Solo productos activos son visibles públicamente</small>
            </div>
          </div>

          {/* Alertas de stock crítico */}
          {isStockCritical && (
            <div className="stock-alert" style={{
              display: 'block',
              background: '#ff4444',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <i className="fas fa-exclamation-triangle"></i>
              <span> ¡Alerta! El stock está en nivel crítico</span>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/admin')}
              disabled={loading}
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'GUARDANDO...' : 'GUARDAR PRODUCTO'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminNewProduct
