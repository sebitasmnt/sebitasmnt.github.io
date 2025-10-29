import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import Comunidad from './pages/Comunidad'
import Blogs from './pages/Blogs'
import Contacto from './pages/Contacto'
import DetalleProducto from './pages/DetalleProducto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import AdminDashboard from './pages/AdminDashboard'
import AdminNewUser from './pages/AdminNewUser'
import AdminNewProduct from './pages/AdminNewProduct'
import AdminUsers from './pages/AdminUsers'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/comunidad" element={<Comunidad />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/producto/:codigo" element={<DetalleProducto />} />
                
                {/* Rutas de autenticación */}
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/perfil" element={<Perfil />} />
                
                {/* Rutas de administración */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/new-user" element={<AdminNewUser />} />
                <Route path="/admin/new-product" element={<AdminNewProduct />} />
                <Route path="/admin/users" element={<AdminUsers />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

