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

