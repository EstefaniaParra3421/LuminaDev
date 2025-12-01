/**
 * ProductDetail.jsx
 * 
 * Vista de detalle completo de un producto estilo Amazon
 * Incluye: galería de imágenes, información completa, productos relacionados
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts, getImageBaseUrl } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  // Estados
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

 // Función para construir URL de imagen 
const getImageUrl = (imagePath) => {
  // Placeholder si no hay imagen
  if (!imagePath) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect fill='%23f3f4f6' width='500' height='500'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ESin Imagen%3C/text%3E%3C/svg%3E";
  }
  
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  
  const API_BASE_URL = getImageBaseUrl();
  return `${API_BASE_URL}/uploads/products/${imagePath}`;
};


  // Cargar producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProductById(id);
        setProduct(data);
        
        // Establecer imagen principal
        const mainImage = data.portada || (data.galeria && data.galeria[0]) || '';
        setSelectedImage(mainImage);
        
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('No se pudo cargar el producto. Por favor, intenta nuevamente.');
        showToast('Error al cargar el producto', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, showToast]);

  // Cargar productos relacionados
  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return;
      
      try {
        setLoadingRelated(true);
        const categoria = product.categoria || product.category;
        const productId = product._id || product.id;
        
        if (categoria) {
          const related = await getRelatedProducts(categoria, productId, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error al cargar productos relacionados:', err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelated();
  }, [product]);

  // Handlers
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    const stock = product?.cantidad || 0;
    
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    } else if (newQuantity > stock) {
      showToast(`Solo hay ${stock} unidades disponibles`, 'warning');
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      showToast('Debes iniciar sesión para agregar al carrito', 'info');
      navigate('/login');
      return;
    }

    // TODO: Implementar lógica de agregar al carrito
    showToast(`${quantity} ${quantity > 1 ? 'productos agregados' : 'producto agregado'} al carrito`, 'success');
  };

  const handleBuyNow = () => {
    if (!user) {
      showToast('Debes iniciar sesión para comprar', 'info');
      navigate('/login');
      return;
    }

    // TODO: Implementar lógica de compra directa
    showToast('Redirigiendo al checkout...', 'info');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="product-detail product-detail--loading">
        <div className="product-detail__spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail product-detail--error">
        <div className="product-detail__error-icon">⚠️</div>
        <h2>Producto no encontrado</h2>
        <p>{error || 'El producto que buscas no existe o fue eliminado.'}</p>
        <button 
          onClick={() => navigate('/products')} 
          className="product-detail__error-btn"
        >
          Ver todos los productos
        </button>
      </div>
    );
  }

  // Preparar imágenes para la galería
  const allImages = [
    product.portada,
    ...(product.galeria || [])
  ].filter(Boolean);

  const stock = product.cantidad || 0;
  const inStock = stock > 0;

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <nav className="product-detail__breadcrumb">
        <Link to="/">Inicio</Link>
        <span className="product-detail__breadcrumb-separator">/</span>
        <Link to="/products">Productos</Link>
        <span className="product-detail__breadcrumb-separator">/</span>
        <span className="product-detail__breadcrumb-current">
          {product.nombre || product.name}
        </span>
      </nav>

      {/* Contenido principal */}
      <div className="product-detail__container">
        
        {/* Galería de imágenes */}
        <div className="product-detail__gallery">
          {/* Imagen principal */}
          <div className="product-detail__gallery-main">
            <img 
              src={getImageUrl(selectedImage)} 
              alt={product.nombre || product.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500?text=Sin+Imagen';
              }}
            />
          </div>

          {/* Miniaturas */}
          {allImages.length > 1 && (
            <div className="product-detail__gallery-thumbs">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  className={`product-detail__gallery-thumb ${
                    selectedImage === image ? 'product-detail__gallery-thumb--active' : ''
                  }`}
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={getImageUrl(image)} 
                    alt={`Vista ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100?text=Sin+Imagen';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="product-detail__info">
          <h1 className="product-detail__title">
            {product.nombre || product.name}
          </h1>

          {/* Rating (estático por ahora) */}
          <div className="product-detail__rating">
            <span className="product-detail__stars">⭐⭐⭐⭐⭐</span>
            <span className="product-detail__reviews">(4.5 de 5)</span>
          </div>

          {/* Precio */}
          <div className="product-detail__price-container">
            <span className="product-detail__price">
              ${(product.precio || product.price || 0).toLocaleString('es-CO')}
            </span>
            <span className="product-detail__currency">COP</span>
          </div>

          {/* Stock */}
          <div className={`product-detail__stock ${inStock ? 'product-detail__stock--available' : 'product-detail__stock--unavailable'}`}>
            {inStock ? (
              <>
                <span className="product-detail__stock-icon">✓</span>
                <span>En stock ({stock} {stock === 1 ? 'unidad' : 'unidades'} disponibles)</span>
              </>
            ) : (
              <>
                <span className="product-detail__stock-icon">✗</span>
                <span>Agotado</span>
              </>
            )}
          </div>

          {/* Categoría */}
          {(product.categoria || product.category) && (
            <div className="product-detail__category">
              <strong>Categoría:</strong> 
              <span className="product-detail__category-badge">
                {product.categoria || product.category}
              </span>
            </div>
          )}

          {/* Descripción */}
          <div className="product-detail__description">
            <h3>Descripción del producto</h3>
            <p>{product.descripcion || product.description || 'Sin descripción disponible'}</p>
          </div>

          {/* Selector de cantidad */}
          {inStock && (
            <div className="product-detail__quantity-container">
              <label className="product-detail__quantity-label">Cantidad:</label>
              <div className="product-detail__quantity">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="product-detail__quantity-btn"
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  className="product-detail__quantity-input"
                  aria-label="Cantidad"
                />
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= stock}
                  className="product-detail__quantity-btn"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="product-detail__actions">
            <button 
              onClick={handleAddToCart}
              disabled={!inStock}
              className="product-detail__btn product-detail__btn--cart"
            >
              🛒 Agregar al carrito
            </button>
            <button 
              onClick={handleBuyNow}
              disabled={!inStock}
              className="product-detail__btn product-detail__btn--buy"
            >
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="product-detail__related">
          <h2 className="product-detail__related-title">
            También te puede interesar
          </h2>
          
          {loadingRelated ? (
            <div className="product-detail__related-loading">
              Cargando productos relacionados...
            </div>
          ) : (
            <div className="product-detail__related-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct._id || relatedProduct.id} 
                  product={relatedProduct} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error('Error al cargar el producto:', err);
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail">
        <div>Cargando...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail">
        <div>Error al cargar el producto</div>
      </div>
    );
  }

  // Variable con la información del producto para que otros desarrolladores la usen
  const productInfo = product;

  return (
    <div className="product-detail">
      <div>Detalle del Producto</div>
      {/* La variable productInfo contiene toda la información del producto */}
    </div>
  );
};

export default ProductDetail;

