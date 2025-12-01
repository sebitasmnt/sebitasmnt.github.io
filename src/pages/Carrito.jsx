import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Carrito = () => {
  const { items, subtotal, descuentoMonto, total, removeFromCart, updateQuantity, isLoading } = useCart()

  const formatPrice = (price) => {
    return `$${parseInt(price).toLocaleString()} CLP`
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId)
    } else {
      await updateQuantity(itemId, newQuantity)
    }
  }

  if (isLoading) {
    return (
      <main className="main">
        <div className="card">
          <h1 className="title">Cargando carrito...</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <div className="card">
        <h1 className="title">Tu carrito</h1>
        <div id="productos-carrito" className="productos-carrito">
          {items.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="producto">
                <h3>{item.producto?.nombre || 'Producto'}</h3>
                <p className="muted">Precio: {formatPrice(item.precioUnitario || item.producto?.precio || 0)}</p>
                <img src={item.producto?.imagenUrl || item.producto?.imagen || ''} alt={item.producto?.nombre || 'Producto'} />
                <div className="quantity-controls">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.cantidad - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.cantidad}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.cantidad + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button
                  className="eliminar-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <>
            {descuentoMonto > 0 && (
              <>
                <h3>Subtotal: <span>{formatPrice(subtotal)}</span></h3>
                <h3>Descuento: <span style={{ color: '#39FF14' }}>-{formatPrice(descuentoMonto)}</span></h3>
              </>
            )}
            <h2>Total: <span id="totalCarrito">{formatPrice(total)}</span></h2>
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
