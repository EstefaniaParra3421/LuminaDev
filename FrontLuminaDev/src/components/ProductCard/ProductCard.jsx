import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getImageBaseUrl, addToCart } from '../../services/api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  // Manejar diferentes nombres de propiedades (español/inglés)
  const name = product.name || product.nombre || 'Producto sin nombre';
  const price = product.price || product.precio || 0;
  const description = product.description || product.descripcion || '';
  const category = product.category || product.categoria || '';
  // Usar cantidad del backend, o stock como fallback para compatibilidad
  const stock = product.cantidad !== undefined ? product.cantidad : (product.stock !== undefined ? product.stock : 0);
  
  // Construir URL de la imagen
  const getImageUrl = () => {
    // Si tiene portada (imagen subida), construir la URL del backend
    if (product.portada) {
      // Para imágenes, necesitamos usar la URL completa del backend
      // porque el proxy solo funciona para peticiones axios, no para tags <img>
      const API_BASE_URL = getImageBaseUrl();
      return `${API_BASE_URL}/uploads/products/${product.portada}`;
    }
    // Si tiene image o imagen (para compatibilidad)
    // Validar que sea una URL válida (empiece con http:// o https://)
    if (product.image) {
      const imageUrl = product.image.trim();
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      // Si no es una URL completa, podría ser una ruta relativa, ignorarla
    }
    if (product.imagen) {
      const imagenUrl = product.imagen.trim();
      if (imagenUrl.startsWith('http://') || imagenUrl.startsWith('https://')) {
        return imagenUrl;
      }
    }
    // Imagen por defecto
    return 'https://via.placeholder.com/300';
  };
  
  const image = getImageUrl();

  const handleAddToCart = async () => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated() || !user) {
      showToast('Debes iniciar sesión para agregar productos al carrito', 'warning');
      navigate('/login');
      return;
    }

    // Verificar que el producto tenga stock
    if (stock === 0) {
      showToast('Este producto está agotado', 'error');
      return;
    }

    try {
      // Obtener el ID del usuario (puede ser user.id o user._id)
      const usuarioId = user.id || user._id;
      // Obtener el ID del producto
      const productoId = product._id || product.id;
      
      if (!usuarioId || !productoId) {
        showToast('Error: No se pudo identificar el usuario o el producto', 'error');
        return;
      }

      // Agregar al carrito
      await addToCart(usuarioId, productoId, price);
      showToast('Producto agregado al carrito', 'success');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      const errorMessage = error.response?.data?.message || 'Error al agregar el producto al carrito';
      showToast(errorMessage, 'error');
    }
  };

  // Manejar clic en la tarjeta para ver detalles
  const handleCardClick = () => {
    const productId = product._id || product.id;
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  // Manejar clic en el botón (evitar propagación)
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Evitar que se active el clic de la tarjeta
    handleAddToCart();
  };

  // Manejar error al cargar imagen
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300';
  };

  return (
    <Link to={`/products/${product._id || product.id}`} className="product-card-link">
      <article 
        className="product-card"
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
      <div className="product-card__image-container">
        <img 
          src={image} 
          alt={name}
          className="product-card__image"
          onError={handleImageError}
        />
        {stock < 10 && stock > 0 && (
          <span className="product-card__badge product-card__badge--low-stock">
            ¡Últimas unidades!
          </span>
        )}
        {stock === 0 && (
          <span className="product-card__badge product-card__badge--out-of-stock">
            Agotado
          </span>
        )}
      </div>

      <div className="product-card__content">
        {category && (
          <span className="product-card__category">{category}</span>
        )}
        
        <h3 className="product-card__title">{name}</h3>
        
        {description && (
          <p className="product-card__description">
            {description.length > 100 
              ? `${description.substring(0, 100)}...` 
              : description
            }
          </p>
        )}

        <div className="product-card__footer">
          <div className="product-card__price-container">
            <span className="product-card__price">
              ${typeof price === 'number' ? price.toLocaleString('es-CO') : '0'}
            </span>
            {stock > 0 && (
              <span className="product-card__stock">{stock} disponibles</span>
            )}
          </div>

          <button 
            className="product-card__button"
            onClick={handleButtonClick}
            disabled={stock === 0}
          >
            {stock === 0 ? 'Agotado' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
      </article>
    </Link>
  );
};

export default ProductCard;

