import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCart, removeFromCart, clearCart, getProductById, getImageBaseUrl } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const usuarioId = user.id || user._id;
      
      if (!usuarioId) {
        showToast('Error: No se pudo identificar el usuario', 'error');
        return;
      }

      const cartData = await getCart(usuarioId);
      setCart(cartData);

      // Obtener detalles de cada producto
      if (cartData.productos && cartData.productos.length > 0) {
        const productDetails = await Promise.all(
          cartData.productos.map(productId => getProductById(productId))
        );
        
        // Contar cantidad de cada producto
        const productCounts = {};
        cartData.productos.forEach(productId => {
          productCounts[productId] = (productCounts[productId] || 0) + 1;
        });

        // Agrupar productos con sus cantidades
        const uniqueProducts = [];
        const seenProducts = new Set();
        
        productDetails.forEach(product => {
          const productId = product._id || product.id;
          if (!seenProducts.has(productId)) {
            seenProducts.add(productId);
            uniqueProducts.push({
              ...product,
              quantity: productCounts[productId],
              subtotal: (product.precio || product.price || 0) * productCounts[productId]
            });
          }
        });

        setCartItems(uniqueProducts);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setCart(null);
        setCartItems([]);
      } else {
        console.error('Error al cargar carrito:', error);
        showToast('Error al cargar el carrito', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    if (!isAuthenticated() || !user) {
      showToast('Debes iniciar sesión para ver tu carrito', 'warning');
      navigate('/login');
      return;
    }

    loadCart();
  }, [user, isAuthenticated, loadCart, navigate, showToast]);

  const handleRemoveItem = async (productId, precio) => {
    try {
      setUpdating(true);
      const usuarioId = user.id || user._id;
      await removeFromCart(usuarioId, productId, precio);
      showToast('Producto eliminado del carrito', 'success');
      await loadCart();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      showToast('Error al eliminar el producto', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('¿Estás seguro de vaciar el carrito?')) {
      return;
    }

    try {
      setUpdating(true);
      const usuarioId = user.id || user._id;
      await clearCart(usuarioId);
      showToast('Carrito vaciado', 'success');
      await loadCart();
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      showToast('Error al vaciar el carrito', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Tu carrito está vacío', 'warning');
      return;
    }

    // Número de WhatsApp desde el Footer
    const whatsappNumber = '573242785517'; // +57 324 278 5517 sin espacios ni +
    
    // Crear mensaje con los productos del carrito
    const userName = user?.nombre || 'Cliente';
    let message = `¡Hola! Soy ${userName} y quiero realizar el siguiente pedido:\n\n`;
    
    cartItems.forEach((item, index) => {
      const productName = item.nombre || item.name || 'Producto sin nombre';
      message += `${index + 1}. ${productName}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: ${formatPrice(item.precio || item.price || 0)}\n`;
      message += `   Subtotal: ${formatPrice(item.subtotal)}\n\n`;
    });
    
    message += `Total: ${formatPrice(total)}\n\n`;
    message += `Por favor, confírmame la disponibilidad y el proceso de pago. ¡Gracias!`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    showToast('Redirigiendo a WhatsApp...', 'success');
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return 'https://via.placeholder.com/150?text=Sin+Imagen';
    }
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    const API_BASE_URL = getImageBaseUrl();
    return `${API_BASE_URL}/uploads/products/${imagePath}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="cart cart--loading">
        <div className="cart__spinner"></div>
        <p>Cargando carrito...</p>
      </div>
    );
  }

  if (!cart || cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__empty-content">
          <div className="cart__empty-icon">🛒</div>
          <h2 className="cart__empty-title">Tu carrito está vacío</h2>
          <p className="cart__empty-text">
            No tienes productos en tu carrito. ¡Explora nuestros productos y añade algunos!
          </p>
          <Link to="/products" className="cart__empty-button">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  const total = cart.total || cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="cart__title">Mi Carrito</h1>
        <button 
          onClick={handleClearCart}
          className="cart__clear-button"
          disabled={updating}
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="cart__content">
        <div className="cart__items">
          {cartItems.map((item) => {
            const productId = item._id || item.id;
            const productName = item.nombre || item.name || 'Producto sin nombre';
            const productPrice = item.precio || item.price || 0;
            const productImage = item.portada || item.image || item.imagen;

            return (
              <div key={productId} className="cart__item">
                <div className="cart__item-image">
                  <img 
                    src={getImageUrl(productImage)} 
                    alt={productName}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Sin+Imagen';
                    }}
                  />
                </div>

                <div className="cart__item-details">
                  <Link to={`/products/${productId}`} className="cart__item-name">
                    {productName}
                  </Link>
                  <p className="cart__item-category">
                    {item.categoria || item.category || 'Sin categoría'}
                  </p>
                  <div className="cart__item-quantity">
                    Cantidad: <strong>{item.quantity}</strong>
                  </div>
                </div>

                <div className="cart__item-price">
                  <div className="cart__item-unit-price">
                    {formatPrice(productPrice)} c/u
                  </div>
                  <div className="cart__item-subtotal">
                    {formatPrice(item.subtotal)}
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(productId, productPrice)}
                  className="cart__item-remove"
                  disabled={updating}
                  aria-label="Eliminar producto"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart__summary">
          <div className="cart__summary-content">
            <h2 className="cart__summary-title">Resumen del Pedido</h2>
            
            <div className="cart__summary-row">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos):</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="cart__summary-row cart__summary-row--total">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="cart__checkout-button"
              disabled={updating || cartItems.length === 0}
            >
              📱 Contactar por WhatsApp
            </button>

            <Link to="/products" className="cart__continue-shopping">
              ← Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
