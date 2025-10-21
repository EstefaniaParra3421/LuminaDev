import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1 className="header__logo-text">Ilumitech</h1>
        </Link>

        <button 
          className="header__menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="header__menu-icon"></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link 
                to="/" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li className="header__nav-item">
              <Link 
                to="/products" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
            </li>
            <li className="header__nav-item">
              <Link 
                to="/about" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Acerca de
              </Link>
            </li>
            <li className="header__nav-item">
              <Link 
                to="/contact" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <button className="header__btn header__btn--cart">
            <span className="header__cart-icon">🛒</span>
            <span className="header__cart-count">0</span>
          </button>
          <button className="header__btn header__btn--user">
            <span className="header__user-icon">👤</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

