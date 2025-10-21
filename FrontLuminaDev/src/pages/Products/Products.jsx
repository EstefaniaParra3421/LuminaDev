import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts } from '../../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos. Por favor, intenta de nuevo.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener categorías únicas
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products">
      <div className="products__header">
        <h1 className="products__title">Nuestros Productos</h1>
        <p className="products__subtitle">
          Explora nuestra selección de productos de alta calidad
        </p>
      </div>

      <div className="products__filters">
        <div className="products__search">
          <input
            type="text"
            className="products__search-input"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="products__search-icon">🔍</span>
        </div>

        <div className="products__category-filter">
          <label className="products__filter-label">Categoría:</label>
          <select
            className="products__category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="products__loading">
          <div className="products__spinner"></div>
          <p>Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="products__error">
          <p>{error}</p>
          <button className="products__retry-button" onClick={fetchProducts}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="products__empty">
          <p>No se encontraron productos</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

