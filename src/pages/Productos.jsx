import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { productos, categorias } from '../data/productos'
import { useCart } from '../context/CartContext'

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { addToCart } = useCart()

  const filteredProductos = useMemo(() => {
    return productos.filter(producto => {
      const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || producto.categoria === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const productosByCategory = useMemo(() => {
    const grouped = {}
    filteredProductos.forEach(producto => {
      if (!grouped[producto.categoria]) {
        grouped[producto.categoria] = []
      }
      grouped[producto.categoria].push(producto)
    })
    return grouped
  }, [filteredProductos])

  const handleAddToCart = (producto) => {
    addToCart(producto)
  }

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
        <section key={categoria} id={categoria.toLowerCase().replace(/\s+/g, '-')} className="productos">
          <h2>{categoria}</h2>
          <div className="producto-lista">
            {productosCategoria.map(producto => (
              <div key={producto.codigo} className="juego">
                <h2>{producto.nombre}</h2>
                <img id="producto-img" src={producto.imagen} alt={producto.nombre} />
                <p className="precio">{producto.precio_texto}</p>
                <button 
                  className="btn-carrito"
                  onClick={() => handleAddToCart(producto)}
                >
                  <i className="fa-solid fa-cart-plus"></i> Agregar al carrito
                </button>
                <Link to={`/producto/${producto.codigo}`} className="btn-detalle">
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

