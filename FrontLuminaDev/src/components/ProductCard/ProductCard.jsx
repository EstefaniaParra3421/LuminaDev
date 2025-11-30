import React from 'react';
import { Link } from 'react-router-dom';
import { getImageBaseUrl } from '../../services/api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
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

  const handleAddToCart = () => {
    // Lógica para añadir al carrito
  };

  // Manejar error al cargar imagen
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300';
  };

  return (
  <Link to={`/products/${product._id || product.id}`} className="product-card-link">
    <article className="product-card">
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
            onClick={handleAddToCart}
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

