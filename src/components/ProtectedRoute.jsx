import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, isLoading, user } = useAuth()

    if (isLoading) {
        return (
            <div className="main">
                <div className="card">
                    <h1>Cargando...</h1>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (adminOnly && user?.rol !== 'admin') {
        return (
            <div className="main">
                <div className="card">
                    <h1 style={{ color: '#ff3939' }}>⛔ Acceso Denegado</h1>
                    <p>No tienes permisos para acceder a esta página.</p>
                    <p>Se requiere rol de administrador.</p>
                </div>
            </div>
        )
    }

    return children
}

export default ProtectedRoute
