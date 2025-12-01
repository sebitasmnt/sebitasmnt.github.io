import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Cargar productos del backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true)
        const data = await productService.getAll()
        setProductos(data)

        // Extraer categorías únicas
        const uniqueCategories = [...new Set(data.map(p => p.categoria?.nombre || p.categoria))]
        setCategorias(uniqueCategories)

        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  const filteredProductos = useMemo(() => {
    return productos.filter(producto => {
      const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      const categoriaNombre = producto.categoria?.nombre || producto.categoria
      const matchesCategory = !selectedCategory || categoriaNombre === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, productos])

  const productosByCategory = useMemo(() => {
    const grouped = {}
    filteredProductos.forEach(producto => {
      const categoriaNombre = producto.categoria?.nombre || producto.categoria
      if (!grouped[categoriaNombre]) {
        grouped[categoriaNombre] = []
      }
      grouped[categoriaNombre].push(producto)
    })
    return grouped
  }, [filteredProductos])


  const handleAddToCart = async (producto) => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar productos al carrito')
      navigate('/login')
      return
    }

    try {
      console.log('Agregando producto al carrito:', producto)
      const result = await addToCart(producto, 1)

      if (result.success) {
        alert('✓ Producto agregado al carrito')
      } else {
        alert('✗ ' + (result.message || 'Error al agregar al carrito'))
      }
    } catch (error) {
      console.error('Error en handleAddToCart:', error)
      alert('✗ Error al agregar al carrito')
    }
  }


  if (loading) return <div className="main"><div className="card"><h1>Cargando productos...</h1></div></div>
  if (error) return <div className="main"><div className="card"><h1>Error: {error}</h1></div></div>

  return (
    <>
      <section id="productos" className="productos">
        <h2>Categorías</h2>
        <div className="grid">
          {categorias.map(categoria => (
            <div
              key={categoria}
              className={`producto ${selectedCategory === categoria ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === categoria ? '' : categoria)}
            >
              {categoria}
            </div>
          ))}
        </div>
      </section>

      <section className="buscador-productos">
        <input
          type="text"
          id="buscadorInput"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      {Object.entries(productosByCategory).map(([categoria, productosCategoria]) => (
        <section key={categoria} id={categoria.toLowerCase().replace(/\\s+/g, '-')} className="productos">
          <h2>{categoria}</h2>
          <div className="producto-lista">
            {productosCategoria.map(producto => (
              <div key={producto.codigo || producto.id} className="juego">
                <h2>{producto.nombre}</h2>
                <img id="producto-img" src={producto.imagenUrl || producto.imagen} alt={producto.nombre} />
                <p className="precio">${parseInt(producto.precio).toLocaleString()} CLP</p>
                <button
                  className="btn-carrito"
                  onClick={() => handleAddToCart(producto)}
                >
                  <i className="fa-solid fa-cart-plus"></i> Agregar al carrito
                </button>
                <Link to={`/producto/${producto.codigo || producto.id}`} className="btn-detalle">
                  Ver detalle
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

export default Productos
