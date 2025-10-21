import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, price, description, image, category, stock } = product;

  const handleAddToCart = () => {
    console.log('Añadiendo producto al carrito:', product);
    // Lógica para añadir al carrito
  };

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img 
          src={image || 'https://via.placeholder.com/300'} 
          alt={name}
          className="product-card__image"
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
            <span className="product-card__price">${price.toLocaleString('es-CO')}</span>
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

