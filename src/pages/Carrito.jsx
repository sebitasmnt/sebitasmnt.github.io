import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Carrito = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  const formatPrice = (price) => {
    return `$${price.toLocaleString()} CLP`
  }

  return (
    <main className="main">
      <div className="card">
        <h1 className="title">Tu carrito</h1>
        <div id="productos-carrito" className="productos-carrito">
          {items.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.codigo}-${index}`} className="producto">
                <h3>{item.nombre}</h3>
                <p className="muted">Precio: {item.precio_texto}</p>
                <img src={item.imagen} alt={item.nombre} />
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.codigo, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.codigo, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button 
                  className="eliminar-btn" 
                  onClick={() => removeFromCart(item.codigo)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <>
            <h2>Total: <span id="totalCarrito">{formatPrice(getTotalPrice())}</span></h2>
            <div className="actions mt-3">
              <Link className="btn btn--ghost" to="/productos">Seguir comprando</Link>
              <button className="btn btn--primary">Proceder al pago</button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Carrito

