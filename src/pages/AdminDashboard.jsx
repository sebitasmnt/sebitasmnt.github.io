import React from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="welcome-message">
        <h2>¡HOLA Administrador!</h2>
        <p>Bienvenido al panel de control de Level-Up Gamer. Desde aquí podrás gestionar todos los aspectos de la tienda.</p>
      </div>

      {/* Enlaces rápidos */}
      <div className="quick-links" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Link to="/admin/new-user" className="quick-link-card">
          <i className="fas fa-user-plus"></i>
          <h3>Nuevo Usuario</h3>
          <p>Registrar un nuevo usuario en el sistema</p>
        </Link>
        <Link to="/admin/new-product" className="quick-link-card">
          <i className="fas fa-box"></i>
          <h3>Nuevo Producto</h3>
          <p>Agregar un nuevo producto al inventario</p>
        </Link>
        <Link to="/admin/users" className="quick-link-card">
          <i className="fas fa-users"></i>
          <h3>Gestionar Usuarios</h3>
          <p>Ver y administrar usuarios registrados</p>
        </Link>
        <Link to="/admin/inventory" className="quick-link-card">
          <i className="fas fa-warehouse"></i>
          <h3>Inventario</h3>
          <p>Gestionar productos y stock</p>
        </Link>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
