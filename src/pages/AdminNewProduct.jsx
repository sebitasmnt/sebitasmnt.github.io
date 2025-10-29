import React, { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

const AdminNewProduct = () => {
  const [formData, setFormData] = useState({
    codigoProducto: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockCritico: '',
    categoria: '',
    imagen: null
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const categorias = [
    { value: 'juegos-mesa', label: 'Juegos de Mesa' },
    { value: 'accesorios', label: 'Accesorios Gaming' },
    { value: 'consolas', label: 'Consolas' },
    { value: 'perifericos', label: 'Periféricos' },
    { value: 'componentes', label: 'Componentes PC' },
    { value: 'software', label: 'Software' },
    { value: 'merchandising', label: 'Merchandising' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagen: file
      }))

      // Crear preview de la imagen
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (!formData.codigoProducto || formData.codigoProducto.length < 3) {
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

    // Simular guardado exitoso
    setMessage('Producto guardado exitosamente')
    setMessageType('success')
    
    // Resetear formulario después de 2 segundos
    setTimeout(() => {
      setFormData({
        codigoProducto: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        stockCritico: '',
        categoria: '',
        imagen: null
      })
      setImagePreview(null)
      setMessage('')
    }, 2000)
  }

  const isStockCritical = formData.stock && formData.stockCritico && 
    parseInt(formData.stock) <= parseInt(formData.stockCritico)

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
              <label htmlFor="codigoProducto">Código Producto <span className="required">*</span></label>
              <input 
                type="text" 
                id="codigoProducto" 
                name="codigoProducto" 
                minLength="3" 
                value={formData.codigoProducto}
                onChange={handleChange}
                required
              />
              <small className="form-help">Mínimo 3 caracteres, sin límite máximo</small>
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
                required
              />
              <small className="form-help">Cantidad en inventario. Solo números enteros</small>
            </div>

            {/* Stock Crítico */}
            <div className="form-group">
              <label htmlFor="stockCritico">Stock Crítico</label>
              <input 
                type="number" 
                id="stockCritico" 
                name="stockCritico" 
                min="0" 
                value={formData.stockCritico}
                onChange={handleChange}
              />
              <small className="form-help">Opcional. Solo números enteros. Alerta cuando stock ≤ este valor</small>
            </div>

            {/* Categorías */}
            <div className="form-group">
              <label htmlFor="categoria">Categoría <span className="required">*</span></label>
              <select 
                id="categoria" 
                name="categoria" 
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.value} value={categoria.value}>
                    {categoria.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Imagen */}
            <div className="form-group">
              <label htmlFor="imagen">Imagen</label>
              <input 
                type="file" 
                id="imagen" 
                name="imagen" 
                accept="image/*"
                onChange={handleImageChange}
              />
              <small className="form-help">Opcional. Formatos: JPG, PNG, GIF</small>
            </div>

            {/* Vista previa de imagen */}
            <div className="form-group">
              <label>Vista Previa</label>
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                    <i className="fas fa-image" style={{ fontSize: '2em', marginBottom: '10px' }}></i>
                    <p>No hay imagen seleccionada</p>
                  </div>
                )}
              </div>
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
            <button type="button" className="btn-cancel" onClick={() => window.history.back()}>
              CANCELAR
            </button>
            <button type="submit" className="btn-submit">GUARDAR PRODUCTO</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminNewProduct
