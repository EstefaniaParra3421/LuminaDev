import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return '✅';
    }
  };

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{getIcon()}</span>
      <p className="toast__message">{message}</p>
      <button 
        className="toast__close" 
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;

