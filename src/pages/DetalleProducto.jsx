import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productos } from '../data/productos'
import { useCart } from '../context/CartContext'

const DetalleProducto = () => {
  const { codigo } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const producto = productos.find(p => p.codigo === codigo)

  if (!producto) {
    return (
      <div className="mensaje-error">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe.</p>
        <Link to="/productos" className="btn">Volver a Productos</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(producto)
    }
  }

  const productosRelacionados = productos
    .filter(p => p.categoria === producto.categoria && p.codigo !== producto.codigo)
    .slice(0, 4)

  return (
    <>
      <div className="detalle-container">
        <div className="detalle-img">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="detalle-img-main"
          />
        </div>
        
        <div className="detalle-info">
          <div className="detalle-nombre-precio">
            <h1 className="detalle-nombre">{producto.nombre}</h1>
            <span className="detalle-precio">{producto.precio_texto}</span>
          </div>
          
          <p className="detalle-descripcion">
            Producto de alta calidad para gamers. Perfecto para mejorar tu experiencia de gaming.
          </p>
          
          <div className="detalle-cantidad">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <button 
            className="btn-carrito"
            onClick={handleAddToCart}
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
                key={relacionado.codigo}
                to={`/producto/${relacionado.codigo}`}
                className="relacionado-item"
              >
                <img src={relacionado.imagen} alt={relacionado.nombre} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default DetalleProducto

