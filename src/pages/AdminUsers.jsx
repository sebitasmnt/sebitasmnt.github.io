import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5

  // Datos de ejemplo (en un proyecto real vendrían de una API)
  const mockUsers = [
    {
      id: '1',
      fecha: '2025-01-15',
      numeroOrden: '#ORD-001',
      cliente: 'Acme Corporation',
      estado: 'shipped',
      monto: 1200.00
    },
    {
      id: '2',
      fecha: '2025-01-14',
      numeroOrden: '#ORD-002',
      cliente: 'Bravo Solutions',
      estado: 'pending',
      monto: 900.00
    },
    {
      id: '3',
      fecha: '2025-01-13',
      numeroOrden: '#ORD-003',
      cliente: 'Charlie Gaming',
      estado: 'shipped',
      monto: 2100.00
    },
    {
      id: '4',
      fecha: '2025-01-12',
      numeroOrden: '#ORD-004',
      cliente: 'Delta Electronics',
      estado: 'cancelled',
      monto: 750.00
    },
    {
      id: '5',
      fecha: '2025-01-11',
      numeroOrden: '#ORD-005',
      cliente: 'Echo Systems',
      estado: 'pending',
      monto: 1500.00
    }
  ]

  useEffect(() => {
    setUsers(mockUsers)
  }, [])

  const filteredUsers = users.filter(user =>
    user.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.numeroOrden.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const getStatusClass = (status) => {
    switch (status) {
      case 'shipped':
        return 'status-shipped'
      case 'pending':
        return 'status-pending'
      case 'cancelled':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'shipped':
        return 'Shipped'
      case 'pending':
        return 'Pending'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  const handleEdit = (userId) => {
    alert(`Editar usuario ${userId}`)
  }

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <AdminLayout>
      <div className="data-table">
        <div className="table-header">
          <h2>Usuarios</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '5px',
                border: '1px solid #333',
                background: '#000',
                color: '#fff',
                minWidth: '200px'
              }}
            />
            <a href="/admin/new-user" className="btn-new">NUEVO USUARIO</a>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Número de Orden</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Monto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.fecha}</td>
                <td>{user.numeroOrden}</td>
                <td>{user.cliente}</td>
                <td>
                  <span className={getStatusClass(user.estado)}>
                    {getStatusText(user.estado)}
                  </span>
                </td>
                <td>${user.monto.toLocaleString()}</td>
                <td>
                  <button 
                    className="btn-edit" 
                    onClick={() => handleEdit(user.id)}
                    style={{
                      background: '#1E90FF',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(user.id)}
                    style={{
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminUsers
