import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { login as loginApi } from '../../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'correo':
        if (!value.trim()) {
          error = 'El correo es obligatorio';
        } else if (!validateEmail(value)) {
          error = 'Ingresa un correo válido';
        }
        break;
      case 'contraseña':
        if (!value) {
          error = 'La contraseña es obligatoria';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (serverError) {
      setServerError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginApi(formData);
      
      if (response.usuario) {
        // Verificar que el usuario sea administrador
        if (response.usuario.rol !== 'administrador') {
          setServerError('Acceso denegado. Solo los administradores pueden acceder.');
          setIsLoading(false);
          return;
        }

        login(response.usuario, response.token);
        showToast(`¡Bienvenido, ${response.usuario.nombre}!`, 'success');
        navigate('/admin123/dashboard');
      }
    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.mensaje || 'Error al iniciar sesión');
      } else if (error.request) {
        setServerError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        setServerError('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__card">
          <div className="admin-login__header">
            <h1 className="admin-login__title">🔐 Panel de Administración</h1>
            <p className="admin-login__subtitle">
              Acceso exclusivo para administradores
            </p>
          </div>

          <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="admin-login__alert admin-login__alert--error">
                <span className="admin-login__alert-icon">⚠️</span>
                <p className="admin-login__alert-text">{serverError}</p>
              </div>
            )}

            <div className="admin-login__form-group">
              <label htmlFor="correo" className="admin-login__label">
                Correo Electrónico
              </label>
              <div className="admin-login__input-wrapper">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className={`admin-login__input ${errors.correo ? 'admin-login__input--error' : ''}`}
                  placeholder="admin@lumina.com"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isLoading}
                />
                <span className="admin-login__input-icon">📧</span>
              </div>
              {errors.correo && (
                <p className="admin-login__error-message">{errors.correo}</p>
              )}
            </div>

            <div className="admin-login__form-group">
              <label htmlFor="contraseña" className="admin-login__label">
                Contraseña
              </label>
              <div className="admin-login__input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contraseña"
                  name="contraseña"
                  className={`admin-login__input ${errors.contraseña ? 'admin-login__input--error' : ''}`}
                  placeholder="Tu contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="admin-login__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.contraseña && (
                <p className="admin-login__error-message">{errors.contraseña}</p>
              )}
            </div>

            <button
              type="submit"
              className="admin-login__submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="admin-login__spinner"></span>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                'Acceder al Panel'
              )}
            </button>
          </form>

          <div className="admin-login__footer">
            <p className="admin-login__footer-text">
              <a href="/" className="admin-login__footer-link">
                ← Volver al sitio
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

