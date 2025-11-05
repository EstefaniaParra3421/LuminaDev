import React from 'react';
import { Link } from 'react-router-dom';
import './Sitemap.css';

const Sitemap = () => {
  const siteStructure = [
    {
      title: 'Explora Ilumitech',
      icon: '🏠',
      links: [
        { path: '/', name: 'Inicio', description: 'Descubre nuestras ofertas y novedades destacadas', status: 'active' },
        { path: '/products', name: 'Catálogo de Productos', description: 'Explora todos nuestros productos de iluminación', status: 'active' },
        { path: '/about', name: 'Acerca de Nosotros', description: 'Conoce nuestra historia y compromiso con la calidad', status: 'pending' },
        { path: '/contact', name: 'Contáctanos', description: 'Estamos aquí para ayudarte con tus consultas', status: 'pending' }
      ]
    },
    {
      title: 'Tu Cuenta',
      icon: '🔐',
      links: [
        { path: '/login', name: 'Iniciar Sesión', description: 'Accede a tu cuenta personal', status: 'active' },
        { path: '/register', name: 'Crear Cuenta', description: 'Únete a la comunidad Ilumitech', status: 'active' }
      ]
    },
    {
      title: 'Mi Área Personal',
      icon: '👤',
      requiresAuth: true,
      links: [
        { path: '/profile', name: 'Mi Perfil', description: 'Gestiona tu información personal y preferencias', status: 'pending' },
        { path: '/orders', name: 'Mis Pedidos', description: 'Revisa tus compras y seguimiento de envíos', status: 'pending' },
        { path: '/wishlist', name: 'Favoritos', description: 'Guarda tus productos preferidos para después', status: 'pending' }
      ]
    },
    {
      title: 'Proceso de Compra',
      icon: '🛒',
      links: [
        { path: '/cart', name: 'Mi Carrito', description: 'Revisa y modifica los productos que vas a comprar', status: 'pending' },
        { path: '/checkout', name: 'Finalizar Compra', description: 'Completa tu pedido de forma rápida y segura', status: 'pending' }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="sitemap__badge sitemap__badge--active">✅ Ya disponible</span>;
      case 'pending':
        return <span className="sitemap__badge sitemap__badge--pending">🔜 Muy pronto</span>;
      case 'development':
        return <span className="sitemap__badge sitemap__badge--dev">🚧 En construcción</span>;
      default:
        return null;
    }
  };

  return (
    <div className="sitemap">
      <div className="sitemap__container">
        {/* Header */}
        <div className="sitemap__header">
          <h1 className="sitemap__title">🗺️ Mapa del Sitio</h1>
          <p className="sitemap__subtitle">
            Encuentra fácilmente todo lo que necesitas en nuestra tienda
          </p>
        </div>

        {/* Estadísticas */}
        <div className="sitemap__stats">
          <div className="sitemap__stat">
            <span className="sitemap__stat-value">
              {siteStructure.reduce((acc, section) => acc + section.links.length, 0)}
            </span>
            <span className="sitemap__stat-label">Secciones disponibles</span>
          </div>
          <div className="sitemap__stat">
            <span className="sitemap__stat-value">
              {siteStructure.reduce((acc, section) => 
                acc + section.links.filter(link => link.status === 'active').length, 0
              )}
            </span>
            <span className="sitemap__stat-label">Ya disponibles</span>
          </div>
          <div className="sitemap__stat">
            <span className="sitemap__stat-value">
              {siteStructure.reduce((acc, section) => 
                acc + section.links.filter(link => link.status === 'pending').length, 0
              )}
            </span>
            <span className="sitemap__stat-label">Muy pronto</span>
          </div>
        </div>

        {/* Secciones del sitio */}
        <div className="sitemap__sections">
          {siteStructure.map((section, index) => (
            <div key={index} className="sitemap__section">
              <div className="sitemap__section-header">
                <span className="sitemap__section-icon">{section.icon}</span>
                <h2 className="sitemap__section-title">{section.title}</h2>
                {section.requiresAuth && (
                  <span className="sitemap__section-badge">🔒 Necesitas iniciar sesión</span>
                )}
              </div>

              <div className="sitemap__links">
                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="sitemap__link-card">
                    <div className="sitemap__link-header">
                      {link.status === 'active' ? (
                        <Link to={link.path} className="sitemap__link-title">
                          {link.name}
                        </Link>
                      ) : (
                        <span className="sitemap__link-title sitemap__link-title--disabled">
                          {link.name}
                        </span>
                      )}
                      {getStatusBadge(link.status)}
                    </div>
                    <p className="sitemap__link-description">{link.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Información para el cliente */}
        <div className="sitemap__footer">
          <div className="sitemap__info">
            <h3 className="sitemap__info-title">💡 ¿Por qué elegir Ilumitech?</h3>
            <div className="sitemap__info-grid">
              <div className="sitemap__info-item">
                <strong>🚚 Envíos rápidos:</strong>
                <span>Recibe tus productos en tiempo récord</span>
              </div>
              <div className="sitemap__info-item">
                <strong>🔒 Compra segura:</strong>
                <span>Protegemos tu información y pagos</span>
              </div>
              <div className="sitemap__info-item">
                <strong>⭐ Calidad garantizada:</strong>
                <span>Productos certificados y duraderos</span>
              </div>
              <div className="sitemap__info-item">
                <strong>💬 Soporte 24/7:</strong>
                <span>Estamos aquí para ayudarte siempre</span>
              </div>
            </div>
          </div>

          <div className="sitemap__legend">
            <h4 className="sitemap__legend-title">📋 Guía de íconos:</h4>
            <div className="sitemap__legend-items">
              <div className="sitemap__legend-item">
                <span className="sitemap__badge sitemap__badge--active">✅ Ya disponible</span>
                <span>Puedes acceder ahora mismo</span>
              </div>
              <div className="sitemap__legend-item">
                <span className="sitemap__badge sitemap__badge--pending">🔜 Muy pronto</span>
                <span>Estamos trabajando en ello</span>
              </div>
              <div className="sitemap__legend-item">
                <span className="sitemap__section-badge">🔒 Necesitas iniciar sesión</span>
                <span>Crea tu cuenta para acceder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación rápida */}
        <div className="sitemap__quick-nav">
          <h3 className="sitemap__quick-nav-title">🚀 Accesos rápidos para ti</h3>
          <div className="sitemap__quick-links">
            <Link to="/" className="sitemap__quick-link">
              <span className="sitemap__quick-link-icon">🏠</span>
              <span>Volver al Inicio</span>
            </Link>
            <Link to="/products" className="sitemap__quick-link">
              <span className="sitemap__quick-link-icon">🛍️</span>
              <span>Explorar Productos</span>
            </Link>
            <Link to="/login" className="sitemap__quick-link">
              <span className="sitemap__quick-link-icon">🔐</span>
              <span>Mi Cuenta</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;

