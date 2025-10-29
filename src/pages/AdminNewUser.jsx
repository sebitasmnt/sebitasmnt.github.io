import React, { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

const AdminNewUser = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    tipoUsuario: '',
    region: '',
    comuna: '',
    direccion: '',
    registroEn: '',
    asignadoA: ''
  })

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const regiones = [
    { value: 'metropolitana', label: 'Región Metropolitana' },
    { value: 'valparaiso', label: 'Región de Valparaíso' },
    { value: 'ohiggins', label: 'Región del Libertador General Bernardo O\'Higgins' },
    { value: 'maule', label: 'Región del Maule' },
    { value: 'biobio', label: 'Región del Biobío' },
    { value: 'araucania', label: 'Región de La Araucanía' },
    { value: 'losrios', label: 'Región de Los Ríos' },
    { value: 'loslagos', label: 'Región de Los Lagos' },
    { value: 'aysen', label: 'Región Aysén del General Carlos Ibáñez del Campo' },
    { value: 'magallanes', label: 'Región de Magallanes y de la Antártica Chilena' },
    { value: 'tarapaca', label: 'Región de Tarapacá' },
    { value: 'antofagasta', label: 'Región de Antofagasta' },
    { value: 'atacama', label: 'Región de Atacama' },
    { value: 'coquimbo', label: 'Región de Coquimbo' }
  ]

  const comunas = {
    metropolitana: ['Santiago', 'Las Condes', 'Providencia', 'Ñuñoa', 'Maipú'],
    valparaiso: ['Valparaíso', 'Viña del Mar', 'Concón', 'Quilpué', 'Villa Alemana'],
    ohiggins: ['Rancagua', 'San Fernando', 'Pichilemu', 'Santa Cruz', 'Machalí'],
    maule: ['Talca', 'Curicó', 'Linares', 'Cauquenes', 'Constitución'],
    biobio: ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel'],
    araucania: ['Temuco', 'Villarrica', 'Pucón', 'Angol', 'Victoria'],
    losrios: ['Valdivia', 'La Unión', 'Río Bueno', 'Paillaco', 'Los Lagos'],
    loslagos: ['Puerto Montt', 'Osorno', 'Castro', 'Ancud', 'Quellón'],
    aysen: ['Coyhaique', 'Aysén', 'Chile Chico', 'Cochrane', 'Puerto Aysén'],
    magallanes: ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos', 'Primavera'],
    tarapaca: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Huara', 'Camiña'],
    antofagasta: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones', 'Taltal'],
    atacama: ['Copiapó', 'Vallenar', 'Caldera', 'Chañaral', 'Diego de Almagro'],
    coquimbo: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Vicuña']
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Si cambia la región, resetear comuna
    if (name === 'region') {
      setFormData(prev => ({
        ...prev,
        region: value,
        comuna: ''
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (!formData.run || formData.run.length < 7) {
      setMessage('El RUN debe tener al menos 7 caracteres')
      setMessageType('error')
      return
    }

    if (!formData.correo.includes('@')) {
      setMessage('El correo debe ser válido')
      setMessageType('error')
      return
    }

    // Simular guardado exitoso
    setMessage('Usuario registrado exitosamente')
    setMessageType('success')
    
    // Resetear formulario después de 2 segundos
    setTimeout(() => {
      setFormData({
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
        tipoUsuario: '',
        region: '',
        comuna: '',
        direccion: '',
        registroEn: '',
        asignadoA: ''
      })
      setMessage('')
    }, 2000)
  }

  return (
    <AdminLayout>
      <div className="form-container">
        <div className="form-header">
          <h2>NUEVO USUARIO</h2>
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

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* RUN */}
            <div className="form-group">
              <label htmlFor="run">RUN <span className="required">*</span></label>
              <input 
                type="text" 
                id="run" 
                name="run" 
                placeholder="Ej: 19011022K" 
                maxLength="9" 
                value={formData.run}
                onChange={handleChange}
                required
              />
              <small className="form-help">Sin puntos ni guión. Min: 7, Max: 9 caracteres</small>
            </div>

            {/* Nombre */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre <span className="required">*</span></label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                maxLength="50" 
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <small className="form-help">Máximo 50 caracteres</small>
            </div>

            {/* Apellidos */}
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos <span className="required">*</span></label>
              <input 
                type="text" 
                id="apellidos" 
                name="apellidos" 
                maxLength="100" 
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
              <small className="form-help">Máximo 100 caracteres</small>
            </div>

            {/* Correo */}
            <div className="form-group">
              <label htmlFor="correo">Correo <span className="required">*</span></label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                maxLength="100" 
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <small className="form-help">Solo @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
            </div>

            {/* Fecha de Nacimiento */}
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input 
                type="date" 
                id="fechaNacimiento" 
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            {/* Tipo de Usuario */}
            <div className="form-group">
              <label htmlFor="tipoUsuario">Tipo de Usuario <span className="required">*</span></label>
              <select 
                id="tipoUsuario" 
                name="tipoUsuario" 
                value={formData.tipoUsuario}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar tipo</option>
                <option value="administrador">Administrador</option>
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
              </select>
            </div>

            {/* Región */}
            <div className="form-group">
              <label htmlFor="region">Región <span className="required">*</span></label>
              <select 
                id="region" 
                name="region" 
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar región</option>
                {regiones.map(region => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Comuna */}
            <div className="form-group">
              <label htmlFor="comuna">Comuna <span className="required">*</span></label>
              <select 
                id="comuna" 
                name="comuna" 
                value={formData.comuna}
                onChange={handleChange}
                required
                disabled={!formData.region}
              >
                <option value="">{formData.region ? 'Seleccionar comuna' : 'Primero seleccione una región'}</option>
                {formData.region && comunas[formData.region]?.map(comuna => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>
            </div>

            {/* Dirección */}
            <div className="form-group full-width">
              <label htmlFor="direccion">Dirección <span className="required">*</span></label>
              <input 
                type="text" 
                id="direccion" 
                name="direccion" 
                maxLength="300" 
                value={formData.direccion}
                onChange={handleChange}
                required
              />
              <small className="form-help">Máximo 300 caracteres</small>
            </div>

            {/* Selectores adicionales */}
            <div className="form-group">
              <label htmlFor="registroEn">El usuario se registra en...</label>
              <select 
                id="registroEn" 
                name="registroEn"
                value={formData.registroEn}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="sistema">Sistema Principal</option>
                <option value="tienda">Tienda Online</option>
                <option value="admin">Panel Administrativo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="asignadoA">El usuario se asigna a...</label>
              <select 
                id="asignadoA" 
                name="asignadoA"
                value={formData.asignadoA}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="ventas">Departamento de Ventas</option>
                <option value="soporte">Departamento de Soporte</option>
                <option value="marketing">Departamento de Marketing</option>
                <option value="administracion">Administración</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">REGISTRAR</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminNewUser
