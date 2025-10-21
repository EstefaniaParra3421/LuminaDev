import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">
            Bienvenido a <span className="home__hero-highlight">Ilumitech</span>
          </h1>
          <p className="home__hero-description">
            Tu plataforma de confianza para descubrir los mejores productos. 
            Gestión eficiente, experiencia excepcional.
          </p>
          <div className="home__hero-actions">
            <Link to="/products" className="home__button home__button--primary">
              Ver Productos
            </Link>
            <Link to="/about" className="home__button home__button--secondary">
              Conocer más
            </Link>
          </div>
        </div>
        <div className="home__hero-image">
          <div className="home__hero-placeholder">
            📦 🛍️ 🚀
          </div>
        </div>
      </section>

      <section className="home__features">
        <h2 className="home__section-title">¿Por qué elegirnos?</h2>
        <div className="home__features-grid">
          <div className="home__feature-card">
            <div className="home__feature-icon">🚚</div>
            <h3 className="home__feature-title">Envío Rápido</h3>
            <p className="home__feature-description">
              Entregas en tiempo récord a todo el país
            </p>
          </div>
          <div className="home__feature-card">
            <div className="home__feature-icon">🔒</div>
            <h3 className="home__feature-title">Pago Seguro</h3>
            <p className="home__feature-description">
              Transacciones protegidas y confiables
            </p>
          </div>
          <div className="home__feature-card">
            <div className="home__feature-icon">💎</div>
            <h3 className="home__feature-title">Calidad Garantizada</h3>
            <p className="home__feature-description">
              Productos verificados y de alta calidad
            </p>
          </div>
          <div className="home__feature-card">
            <div className="home__feature-icon">🎁</div>
            <h3 className="home__feature-title">Ofertas Exclusivas</h3>
            <p className="home__feature-description">
              Descuentos y promociones especiales
            </p>
          </div>
        </div>
      </section>

      <section className="home__cta">
        <div className="home__cta-content">
          <h2 className="home__cta-title">¿Listo para comenzar?</h2>
          <p className="home__cta-description">
            Explora nuestro catálogo y encuentra lo que necesitas
          </p>
          <Link to="/products" className="home__button home__button--primary home__button--large">
            Explorar Productos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

