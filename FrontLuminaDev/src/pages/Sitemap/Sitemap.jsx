import React from 'react';
import { Link } from 'react-router-dom';
import './Sitemap.css';

const Sitemap = () => {
  const siteStructure = [
    {
      title: 'Páginas Principales',
      icon: '🏠',
      links: [
        { path: '/', name: 'Inicio', description: 'Página principal con hero y características', status: 'active' },
        { path: '/products', name: 'Productos', description: 'Catálogo completo de productos', status: 'active' },
        { path: '/about', name: 'Acerca de', description: 'Información sobre Ilumitech', status: 'pending' },
        { path: '/contact', name: 'Contacto', description: 'Formulario de contacto y ubicación', status: 'pending' }
      ]
    },
    {
      title: 'Autenticación',
      icon: '🔐',
      links: [
        { path: '/login', name: 'Iniciar Sesión', description: 'Acceso para usuarios registrados', status: 'active' },
        { path: '/register', name: 'Registrarse', description: 'Crear una nueva cuenta', status: 'active' }
      ]
    },
    {
      title: 'Usuario',
      icon: '👤',
      requiresAuth: true,
      links: [
        { path: '/profile', name: 'Mi Perfil', description: 'Información personal y configuración', status: 'pending' },
        { path: '/orders', name: 'Mis Pedidos', description: 'Historial de compras', status: 'pending' },
        { path: '/wishlist', name: 'Lista de Deseos', description: 'Productos guardados', status: 'pending' }
      ]
    },
    {
      title: 'Compras',
      icon: '🛒',
      links: [
        { path: '/cart', name: 'Carrito', description: 'Productos en tu carrito', status: 'pending' },
        { path: '/checkout', name: 'Checkout', description: 'Finalizar compra', status: 'pending' }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="sitemap__badge sitemap__badge--active">✅ Activo</span>;
      case 'pending':
        return <span className="sitemap__badge sitemap__badge--pending">🔜 Próximamente</span>;
      case 'development':
        return <span className="sitemap__badge sitemap__badge--dev">🚧 En desarrollo</span>;
      default:
        return null;
    }
  };

  return (
    <div className="sitemap">
      <div className="sitemap__container">
        {/* Header */}
        <div className="sitemap__header">
          <h1 className="sitemap__title">Mapa del Sitio</h1>
          <p className="sitemap__subtitle">
            Explora todas las secciones de Ilumitech
          </p>
        </div>

        {/* Estadísticas */}
        <div className="sitemap__stats">
          <div className="sitemap__stat">
            <span className="sitemap__stat-value">
              {siteStructure.reduce((acc, section) => acc + section.links.length, 0)}
            </span>
            <span className="sitemap__stat-label">Total de páginas</span>
          </div>
          <div className="sitemap__stat">
            <span className="sitemap__stat-value">
              {siteStructure.reduce((acc, section) => 
                acc + section.links.filter(link => link.status === 'active').length, 0
              )}
            </span>
            <span className="sitemap__stat-label">Páginas activas</span>
          </div>
          <div className="sitemap__stat">
            <span className="sitemap__stat-value">
              {siteStructure.reduce((acc, section) => 
                acc + section.links.filter(link => link.status === 'pending').length, 0
              )}
            </span>
            <span className="sitemap__stat-label">Próximamente</span>
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
                  <span className="sitemap__section-badge">🔒 Requiere autenticación</span>
                )}
                {section.requiresAdmin && (
                  <span className="sitemap__section-badge sitemap__section-badge--admin">
                    👑 Solo Admin
                  </span>
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
                    <code className="sitemap__link-path">{link.path}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="sitemap__footer">
          <div className="sitemap__info">
            <h3 className="sitemap__info-title">ℹ️ Información del Proyecto</h3>
            <div className="sitemap__info-grid">
              <div className="sitemap__info-item">
                <strong>Tecnología:</strong>
                <span>React 18 + React Router 6</span>
              </div>
              <div className="sitemap__info-item">
                <strong>Metodología CSS:</strong>
                <span>BEM (Block Element Modifier)</span>
              </div>
              <div className="sitemap__info-item">
                <strong>API Backend:</strong>
                <span>Node.js + Express + MongoDB</span>
              </div>
              <div className="sitemap__info-item">
                <strong>Estado Global:</strong>
                <span>Context API (Auth + Toast)</span>
              </div>
            </div>
          </div>

          <div className="sitemap__legend">
            <h4 className="sitemap__legend-title">Leyenda:</h4>
            <div className="sitemap__legend-items">
              <div className="sitemap__legend-item">
                <span className="sitemap__badge sitemap__badge--active">✅ Activo</span>
                <span>Página funcional y disponible</span>
              </div>
              <div className="sitemap__legend-item">
                <span className="sitemap__badge sitemap__badge--pending">🔜 Próximamente</span>
                <span>En desarrollo o planificada</span>
              </div>
              <div className="sitemap__legend-item">
                <span className="sitemap__section-badge">🔒 Requiere autenticación</span>
                <span>Necesitas iniciar sesión</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación rápida */}
        <div className="sitemap__quick-nav">
          <h3 className="sitemap__quick-nav-title">Navegación Rápida</h3>
          <div className="sitemap__quick-links">
            <Link to="/" className="sitemap__quick-link">
              <span className="sitemap__quick-link-icon">🏠</span>
              <span>Volver al Inicio</span>
            </Link>
            <Link to="/products" className="sitemap__quick-link">
              <span className="sitemap__quick-link-icon">🛍️</span>
              <span>Ver Productos</span>
            </Link>
            <Link to="/login" className="sitemap__quick-link">
              <span className="sitemap__quick-link-icon">🔐</span>
              <span>Iniciar Sesión</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;

