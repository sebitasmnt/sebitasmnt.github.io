import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { productService } from '../services/productService'

const AdminInventory = () => {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProductos()
    }, [])

    const fetchProductos = async () => {
        try {
            setLoading(true)
            const data = await productService.getAll()
            setProductos(data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching products:', err)
            setError('Error al cargar el inventario')
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
            try {
                await productService.delete(id)
                // Recargar la lista
                fetchProductos()
                alert('Producto eliminado exitosamente')
            } catch (err) {
                console.error('Error deleting product:', err)
                alert('Error al eliminar el producto')
            }
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="admin-content-header">
                    <h2>Inventario</h2>
                </div>
                <div className="loading-container">
                    <p>Cargando inventario...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="admin-content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Inventario de Productos</h2>
                <Link to="/admin/new-product" className="btn btn--primary">
                    <i className="fas fa-plus"></i> Nuevo Producto
                </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="inventory-table-container" style={{ overflowX: 'auto' }}>
                <table className="inventory-table" style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                            <th style={{ padding: '15px' }}>Imagen</th>
                            <th style={{ padding: '15px' }}>Código</th>
                            <th style={{ padding: '15px' }}>Nombre</th>
                            <th style={{ padding: '15px' }}>Categoría</th>
                            <th style={{ padding: '15px' }}>Precio</th>
                            <th style={{ padding: '15px' }}>Stock</th>
                            <th style={{ padding: '15px' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id} style={{ borderBottom: '1px solid #222' }}>
                                <td style={{ padding: '10px' }}>
                                    <img
                                        src={producto.imagenUrl || producto.imagen}
                                        alt={producto.nombre}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </td>
                                <td style={{ padding: '10px' }}>{producto.codigo}</td>
                                <td style={{ padding: '10px' }}>{producto.nombre}</td>
                                <td style={{ padding: '10px' }}>{producto.categoria?.nombre || producto.categoria}</td>
                                <td style={{ padding: '10px' }}>${parseInt(producto.precio).toLocaleString()}</td>
                                <td style={{ padding: '10px' }}>
                                    <span style={{
                                        color: producto.stock <= (producto.stockMinimo || 10) ? '#ff4444' : '#39FF14',
                                        fontWeight: 'bold'
                                    }}>
                                        {producto.stock}
                                    </span>
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link
                                            to={`/admin/product/edit/${producto.id}`}
                                            className="btn-icon"
                                            style={{ color: 'var(--neon-cyan)', cursor: 'pointer' }}
                                            title="Editar"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(producto.id)}
                                            className="btn-icon"
                                            style={{ background: 'none', border: 'none', color: 'var(--alert-red)', cursor: 'pointer' }}
                                            title="Eliminar"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default AdminInventory
