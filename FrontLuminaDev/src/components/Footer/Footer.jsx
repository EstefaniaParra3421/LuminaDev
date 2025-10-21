import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* Sección de información de la empresa */}
          <div className="footer__section">
            <h3 className="footer__section-title">Ilumitech</h3>
            <p className="footer__section-text">
              Tu plataforma confiable para la gestión de productos y comercio electrónico.
            </p>
            <div className="footer__social">
              <a href="#facebook" className="footer__social-link" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#twitter" className="footer__social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#instagram" className="footer__social-link" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="#linkedin" className="footer__social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
            </div>
          </div>

          {/* Sección de enlaces rápidos */}
          <div className="footer__section">
            <h4 className="footer__section-title">Enlaces Rápidos</h4>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/" className="footer__link">Inicio</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/products" className="footer__link">Productos</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/about" className="footer__link">Acerca de</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/contact" className="footer__link">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Sección de ayuda */}
          <div className="footer__section">
            <h4 className="footer__section-title">Ayuda</h4>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/faq" className="footer__link">Preguntas Frecuentes</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/shipping" className="footer__link">Envíos</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/returns" className="footer__link">Devoluciones</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/support" className="footer__link">Soporte</Link>
              </li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="footer__section">
            <h4 className="footer__section-title">Contacto</h4>
            <ul className="footer__list">
              <li className="footer__list-item footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                <a href="mailto:info@ilumitech.com" className="footer__link">
                  info@ilumitech.com
                </a>
              </li>
              <li className="footer__list-item footer__contact-item">
                <span className="footer__contact-icon">📱</span>
                <a href="tel:+123456789" className="footer__link">
                  +1 234 567 89
                </a>
              </li>
              <li className="footer__list-item footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <span className="footer__contact-text">
                  Cali, Colombia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} Ilumitech. Todos los derechos reservados.
            </p>
            <div className="footer__legal">
              <Link to="/privacy" className="footer__legal-link">
                Política de Privacidad
              </Link>
              <span className="footer__legal-separator">|</span>
              <Link to="/terms" className="footer__legal-link">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

