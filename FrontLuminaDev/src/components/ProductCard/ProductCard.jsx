import React from 'react';
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
      const isDevelopment = process.env.NODE_ENV === 'development';
      let API_BASE_URL;
      
      if (process.env.REACT_APP_API_URL) {
        // Limpiar la URL: eliminar espacios y barras finales
        API_BASE_URL = process.env.REACT_APP_API_URL.trim();
        if (API_BASE_URL.endsWith('/')) {
          API_BASE_URL = API_BASE_URL.slice(0, -1);
        }
      } else if (isDevelopment) {
        // En desarrollo, usar localhost
        API_BASE_URL = 'http://localhost:4000';
      } else {
        // En producción sin variable de entorno, usar la URL por defecto
        API_BASE_URL = 'https://backend-luminadev.vercel.app';
      }
      
      return `${API_BASE_URL}/uploads/products/${product.portada}`;
    }
    // Si tiene image o imagen (para compatibilidad)
    if (product.image) return product.image;
    if (product.imagen) return product.imagen;
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
  );
};

export default ProductCard;

