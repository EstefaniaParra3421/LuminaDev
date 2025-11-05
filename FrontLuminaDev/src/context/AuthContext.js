import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear contexto de autenticación
const AuthContext = createContext(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Función para login
  const login = (userData, token = null) => {
    try {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  };

  // Función para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

