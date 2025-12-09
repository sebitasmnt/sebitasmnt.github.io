import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Carrito = () => {
  const { items, subtotal, descuentoMonto, total, removeFromCart, updateQuantity, checkout, isLoading } = useCart()
  const navigate = useNavigate()

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

  const handleCheckout = async () => {
    if (window.confirm('¿Estás seguro de que quieres confirmar tu compra?')) {
      const result = await checkout();
      if (result.success) {
        alert('¡Compra realizada con éxito! Gracias por tu preferencia.');
        navigate('/');
      } else {
        alert('Hubo un error al procesar tu compra: ' + result.message);
      }
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
      <h1 className="title">Tu carrito</h1>
      <div className="carrito-container">
        <div className="productos-carrito">
          {items.length === 0 ? (
            <div className="card">
              <p>Tu carrito está vacío</p>
              <Link className="btn btn--ghost mt-3" to="/productos">Ir a comprar</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="producto">
                <img src={item.producto?.imagenUrl || item.producto?.imagen || ''} alt={item.producto?.nombre || 'Producto'} />
                <div className="producto-info">
                  <h3>{item.producto?.nombre || 'Producto'}</h3>
                  <p className="muted">Precio: {formatPrice(item.precioUnitario || item.producto?.precio || 0)}</p>
                </div>
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
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="carrito-summary">
            <h2>Resumen de Compra</h2>
            {descuentoMonto > 0 && (
              <>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3" style={{ color: '#39FF14' }}>
                  <span>Descuento:</span>
                  <span>-{formatPrice(descuentoMonto)}</span>
                </div>
              </>
            )}
            <div className="d-flex justify-content-between mb-3" style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'var(--neon-cyan)' }}>
              <span>Total:</span>
              <span id="totalCarrito">{formatPrice(total)}</span>
            </div>

            <div className="actions mt-3" style={{ flexDirection: 'column' }}>
              <button onClick={handleCheckout} className="btn btn--primary" style={{ width: '100%' }}>Proceder al pago</button>
              <Link className="btn btn--ghost" to="/productos" style={{ width: '100%', textAlign: 'center' }}>Seguir comprando</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Carrito
