import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getCart } from '../../services/api';
import logoIlumitech from '../../assets/images/logo_ilumitech.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, logout, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    const userName = user?.nombre || 'Usuario';
    logout();
    setIsUserMenuOpen(false);
    showToast(`¡Hasta pronto, ${userName}!`, 'info');
    navigate('/');
  };

  const handleCartClick = () => {
    if (!user) {
      showToast('Debes iniciar sesión para ver tu carrito', 'warning');
      navigate('/login');
      return;
    }
    navigate('/cart');
  };

  const loadCartCount = useCallback(async () => {
    if (!isAuthenticated() || !user) {
      setCartCount(0);
      return;
    }

    try {
      const usuarioId = user.id || user._id;
      if (!usuarioId) {
        setCartCount(0);
        return;
      }

      const cart = await getCart(usuarioId);
      if (cart && cart.productos) {
        setCartCount(cart.productos.length);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error al cargar contador del carrito:', error);
      }
      setCartCount(0);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadCartCount();
    
    // Recargar el contador cada 5 segundos para mantenerlo actualizado
    const interval = setInterval(() => {
      if (isAuthenticated() && user) {
        loadCartCount();
      }
    }, 5000);

    // Actualizar cuando la ventana recupera el foco
    const handleFocus = () => {
      if (isAuthenticated() && user) {
        loadCartCount();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, isAuthenticated, loadCartCount]);

  return (
    <header className="header">
      <div className="header__glow"></div>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <img 
              src={logoIlumitech} 
              alt="Ilumitech Logo" 
              className="header__logo-image"
            />
          </div>
        </Link>

        <button 
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--active' : ''}`}
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
                <span className="header__nav-icon">🏠</span>
                <span className="header__nav-text">Inicio</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link 
                to="/products" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="header__nav-icon">🛍️</span>
                <span className="header__nav-text">Productos</span>
                <span className="header__nav-badge">Nuevo</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link 
                to="/about" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="header__nav-icon">ℹ️</span>
                <span className="header__nav-text">Acerca de</span>
              </Link>
            </li>
            {/* <li className="header__nav-item">
              <Link 
                to="/contact" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="header__nav-icon">📧</span>
                <span className="header__nav-text">Contacto</span>
              </Link>
            </li> */}
            {/* <li className="header__nav-item">
              <Link 
                to="/sitemap" 
                className="header__nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="header__nav-icon">🗺️</span>
                <span className="header__nav-text">Mapa</span>
              </Link>
            </li> */}
          </ul>
        </nav>

        <div className="header__actions">
          <button 
            className="header__btn header__btn--cart"
            onClick={handleCartClick}
            aria-label="Ver carrito"
          >
            <span className="header__cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="header__cart-count">{cartCount}</span>
            )}
          </button>
          
          {user ? (
            <div className="header__user-menu">
              <button 
                className="header__btn header__btn--user"
                onClick={toggleUserMenu}
              >
                <span className="header__user-icon">👤</span>
                <span className="header__user-name">{user.nombre}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="header__dropdown">
                  <div className="header__dropdown-header">
                    <p className="header__dropdown-name">{user.nombre}</p>
                    <p className="header__dropdown-email">{user.correo}</p>
                  </div>
                  <div className="header__dropdown-divider"></div>
                  <button 
                    className="header__dropdown-item"
                    onClick={handleLogout}
                  >
                    <span>🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="header__auth-buttons">
              <Link to="/login" className="header__btn header__btn--login">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="header__btn header__btn--register">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

