import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { register as registerApi, login as loginApi } from '../../services/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Calcular fuerza de contraseña
  const calculatePasswordStrength = (password) => {
    if (!password) return '';
    
    let strength = 0;
    
    // Longitud
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Mayúsculas y minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    
    // Números
    if (/\d/.test(password)) strength += 1;
    
    // Caracteres especiales
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    if (strength <= 1) return 'débil';
    if (strength <= 3) return 'media';
    return 'fuerte';
  };

  // Validar campo individual
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          error = 'El nombre es obligatorio';
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        } else if (value.trim().length > 50) {
          error = 'El nombre no puede exceder 50 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = 'El nombre solo puede contener letras';
        }
        break;
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
        } else if (value.length > 100) {
          error = 'La contraseña es demasiado larga';
        }
        break;
      case 'confirmarContraseña':
        if (!value) {
          error = 'Debes confirmar tu contraseña';
        } else if (value !== formData.contraseña) {
          error = 'Las contraseñas no coinciden';
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

    // Calcular fuerza de contraseña
    if (name === 'contraseña') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // También validar confirmar contraseña si la contraseña cambia
    if (name === 'contraseña' && formData.confirmarContraseña) {
      setErrors(prev => ({
        ...prev,
        confirmarContraseña: ''
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
      // Enviar solo los campos requeridos por el backend
      const { nombre, correo, contraseña } = formData;
      await registerApi({ nombre, correo, contraseña });
      
      // Mostrar notificación de registro exitoso
      showToast('¡Registro exitoso! Iniciando sesión...', 'success');
      
      // Hacer login automáticamente después del registro
      try {
        const loginResponse = await loginApi({ correo, contraseña });
        
        if (loginResponse.usuario) {
          // Guardar usuario en el contexto
          login(loginResponse.usuario, loginResponse.token);
          
          // Mostrar notificación de bienvenida
          setTimeout(() => {
            showToast(`¡Bienvenido ${loginResponse.usuario.nombre}!`, 'success');
          }, 500);
          
          // Redirigir al home
          navigate('/');
        }
      } catch (loginError) {
        // Si falla el login automático, redirigir al login manual
        console.error('Error en login automático:', loginError);
        showToast('Registro exitoso. Por favor, inicia sesión.', 'info');
        navigate('/login');
      }
    } catch (error) {
      // Manejar errores del servidor
      if (error.response) {
        setServerError(error.response.data.mensaje || 'Error al registrar usuario');
      } else if (error.request) {
        setServerError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        setServerError('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener clase de fuerza de contraseña
  const getStrengthClass = () => {
    if (!passwordStrength) return '';
    return `register__strength-indicator--${passwordStrength}`;
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__card">
          {/* Header */}
          <div className="register__header">
            <h1 className="register__title">Crear Cuenta</h1>
            <p className="register__subtitle">
              Únete a la familia Ilumitech
            </p>
          </div>

          {/* Formulario */}
          <form className="register__form" onSubmit={handleSubmit} noValidate>
            {/* Error del servidor */}
            {serverError && (
              <div className="register__alert register__alert--error">
                <span className="register__alert-icon">⚠️</span>
                <p className="register__alert-text">{serverError}</p>
              </div>
            )}

            {/* Nombre */}
            <div className="register__form-group">
              <label htmlFor="nombre" className="register__label">
                Nombre Completo
              </label>
              <div className="register__input-wrapper">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={`register__input ${errors.nombre ? 'register__input--error' : ''}`}
                  placeholder="Juan Pérez"
                  value={formData.nombre}
                  onChange={handleChange}
                  autoComplete="name"
                  disabled={isLoading}
                />
                <span className="register__input-icon">👤</span>
              </div>
              {errors.nombre && (
                <p className="register__error-message">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div className="register__form-group">
              <label htmlFor="correo" className="register__label">
                Correo Electrónico
              </label>
              <div className="register__input-wrapper">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className={`register__input ${errors.correo ? 'register__input--error' : ''}`}
                  placeholder="tu@email.com"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isLoading}
                />
                <span className="register__input-icon">📧</span>
              </div>
              {errors.correo && (
                <p className="register__error-message">{errors.correo}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="register__form-group">
              <label htmlFor="contraseña" className="register__label">
                Contraseña
              </label>
              <div className="register__input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contraseña"
                  name="contraseña"
                  className={`register__input ${errors.contraseña ? 'register__input--error' : ''}`}
                  placeholder="Mínimo 4 caracteres"
                  value={formData.contraseña}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="register__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.contraseña && (
                <p className="register__error-message">{errors.contraseña}</p>
              )}
              
              {/* Indicador de fuerza de contraseña */}
              {formData.contraseña && !errors.contraseña && (
                <div className="register__strength">
                  <div className={`register__strength-indicator ${getStrengthClass()}`}>
                    <div className="register__strength-bar"></div>
                  </div>
                  <p className="register__strength-text">
                    Seguridad: <strong>{passwordStrength}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="register__form-group">
              <label htmlFor="confirmarContraseña" className="register__label">
                Confirmar Contraseña
              </label>
              <div className="register__input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmarContraseña"
                  name="confirmarContraseña"
                  className={`register__input ${errors.confirmarContraseña ? 'register__input--error' : ''}`}
                  placeholder="Repite tu contraseña"
                  value={formData.confirmarContraseña}
                  onChange={handleChange}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="register__toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmarContraseña && (
                <p className="register__error-message">{errors.confirmarContraseña}</p>
              )}
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              className="register__submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="register__spinner"></span>
                  <span>Registrando...</span>
                </>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="register__footer">
            <p className="register__footer-text">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="register__footer-link">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

