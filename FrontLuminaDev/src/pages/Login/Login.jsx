import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { login as loginApi } from '../../services/api';
import './Login.css';

const Login = () => {
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

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar campo individual
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
        } else if (value.length < 4) {
          error = 'La contraseña debe tener al menos 4 caracteres';
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Limpiar error del servidor
    if (serverError) {
      setServerError('');
    }
  };

  // Validar todo el formulario
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

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginApi(formData);
      
      // Guardar usuario en el contexto
      if (response.usuario) {
        login(response.usuario, response.token);
        
        // Mostrar notificación de bienvenida
        showToast(`¡Bienvenido de vuelta, ${response.usuario.nombre}!`, 'success');
        
        // Redirigir al home
        navigate('/');
      }
    } catch (error) {
      // Manejar errores del servidor
      if (error.response) {
        // Extraer el mensaje de error del servidor
        const errorMessage = error.response.data?.mensaje || error.response.data?.message || 'Error al iniciar sesión';
        setServerError(errorMessage);
        
        // Mostrar también un toast para feedback visual
        showToast(errorMessage, 'error');
      } else if (error.request) {
        const networkError = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        setServerError(networkError);
        showToast(networkError, 'error');
      } else {
        const unexpectedError = 'Ocurrió un error inesperado. Intenta nuevamente.';
        setServerError(unexpectedError);
        showToast(unexpectedError, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__card">
          {/* Header */}
          <div className="login__header">
            <h1 className="login__title">Iniciar Sesión</h1>
            <p className="login__subtitle">
              Accede a tu cuenta de Ilumitech
            </p>
          </div>

          {/* Formulario */}
          <form className="login__form" onSubmit={handleSubmit} noValidate>
            {/* Error del servidor */}
            {serverError && (
              <div className="login__alert login__alert--error">
                <span className="login__alert-icon">⚠️</span>
                <p className="login__alert-text">{serverError}</p>
              </div>
            )}

            {/* Email */}
            <div className="login__form-group">
              <label htmlFor="correo" className="login__label">
                Correo Electrónico
              </label>
              <div className="login__input-wrapper">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className={`login__input ${errors.correo ? 'login__input--error' : ''}`}
                  placeholder="tu@email.com"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isLoading}
                />
                <span className="login__input-icon">📧</span>
              </div>
              {errors.correo && (
                <p className="login__error-message">{errors.correo}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="login__form-group">
              <label htmlFor="contraseña" className="login__label">
                Contraseña
              </label>
              <div className="login__input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contraseña"
                  name="contraseña"
                  className={`login__input ${errors.contraseña ? 'login__input--error' : ''}`}
                  placeholder="Tu contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="login__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.contraseña && (
                <p className="login__error-message">{errors.contraseña}</p>
              )}
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              className="login__submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login__spinner"></span>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login__footer">
            <p className="login__footer-text">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="login__footer-link">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

