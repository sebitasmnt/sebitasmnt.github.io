import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'

const DetalleProducto = () => {
  const { codigo } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [producto, setProducto] = useState(null)
  const [productosRelacionados, setProductosRelacionados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true)

        // Intentar buscar por código o ID
        const todosProductos = await productService.getAll()
        const productoEncontrado = todosProductos.find(p =>
          p.codigo === codigo || p.id.toString() === codigo
        )

        if (!productoEncontrado) {
          setError('Producto no encontrado')
          setLoading(false)
          return
        }

        setProducto(productoEncontrado)

        // Cargar productos relacionados de la misma categoría
        const categoriaNombre = productoEncontrado.categoria?.nombre || productoEncontrado.categoria
        const relacionados = todosProductos
          .filter(p => {
            const pCategoria = p.categoria?.nombre || p.categoria
            return pCategoria === categoriaNombre &&
              p.id !== productoEncontrado.id &&
              p.codigo !== productoEncontrado.codigo
          })
          .slice(0, 4)

        setProductosRelacionados(relacionados)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducto()
  }, [codigo])

  const handleAddToCart = async () => {
    const result = await addToCart(producto, quantity)
    if (result.success) {
      alert(`${quantity} ${quantity === 1 ? 'producto agregado' : 'productos agregados'} al carrito`)
    } else {
      alert(result.message || 'Error al agregar al carrito')
    }
  }

  if (loading) {
    return (
      <div className="main">
        <div className="card">
          <h1>Cargando producto...</h1>
        </div>
      </div>
    )
  }

  if (error || !producto) {
    return (
      <div className="mensaje-error">
        <h2>Producto no encontrado</h2>
        <p>{error || 'El producto que buscas no existe.'}</p>
        <Link to="/productos" className="btn">Volver a Productos</Link>
      </div>
    )
  }

  const formatPrice = (price) => {
    return `$${parseInt(price).toLocaleString()} CLP`
  }

  return (
    <>
      <div className="detalle-container">
        <div className="detalle-img">
          <img
            src={producto.imagenUrl || producto.imagen}
            alt={producto.nombre}
            className="detalle-img-main"
          />
        </div>

        <div className="detalle-info">
          <div className="detalle-nombre-precio">
            <h1 className="detalle-nombre">{producto.nombre}</h1>
            <span className="detalle-precio">{formatPrice(producto.precio)}</span>
          </div>

          <p className="detalle-descripcion">
            {producto.descripcion || 'Producto de alta calidad para gamers. Perfecto para mejorar tu experiencia de gaming.'}
          </p>

          {producto.stock !== undefined && (
            <p className="detalle-stock">
              {producto.stock > 0 ? (
                <span style={{ color: '#39FF14' }}>✓ Stock disponible: {producto.stock} unidades</span>
              ) : (
                <span style={{ color: '#ff3939' }}>✗ Sin stock</span>
              )}
            </p>
          )}

          <div className="detalle-cantidad">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              max={producto.stock || 999}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          <button
            className="btn-carrito"
            onClick={handleAddToCart}
            disabled={producto.stock === 0}
          >
            <i className="fa-solid fa-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <div className="relacionados-container">
          <h3 className="relacionados-title">Productos relacionados</h3>
          <div className="relacionados-lista">
            {productosRelacionados.map(relacionado => (
              <Link
                key={relacionado.id || relacionado.codigo}
                to={`/producto/${relacionado.codigo || relacionado.id}`}
                className="relacionado-item"
              >
                <img src={relacionado.imagenUrl || relacionado.imagen} alt={relacionado.nombre} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default DetalleProducto
