import axios from 'axios';

// URL base de la API - ajustar según configuración del backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar token de autenticación si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);
      
      // Si es un error 401, redirigir al login
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo sucedió al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ============= PRODUCTOS =============

/**
 * Obtener todos los productos
 */
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    // Retornar datos de ejemplo si falla la API
    return getMockProducts();
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};

/**
 * Crear un nuevo producto
 */
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar un producto
 */
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    throw error;
  }
};

// ============= USUARIOS =============

/**
 * Login de usuario
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

/**
 * Registro de usuario
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

/**
 * Logout de usuario
 */
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

// ============= CARRITO =============

/**
 * Obtener carrito del usuario
 */
export const getCart = async () => {
  try {
    const response = await apiClient.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    throw error;
  }
};

/**
 * Agregar producto al carrito
 */
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await apiClient.post('/cart/add', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};

// ============= DATOS DE EJEMPLO =============

/**
 * Productos de ejemplo para desarrollo
 */
const getMockProducts = () => {
  return [
    {
      id: '1',
      name: 'Laptop Profesional',
      price: 2500000,
      description: 'Laptop de alto rendimiento para profesionales y creativos',
      category: 'Electrónica',
      stock: 15,
      image: 'https://via.placeholder.com/300x225/4A90E2/ffffff?text=Laptop'
    },
    {
      id: '2',
      name: 'Mouse Inalámbrico',
      price: 85000,
      description: 'Mouse ergonómico con conexión Bluetooth',
      category: 'Accesorios',
      stock: 45,
      image: 'https://via.placeholder.com/300x225/50C878/ffffff?text=Mouse'
    },
    {
      id: '3',
      name: 'Teclado Mecánico',
      price: 320000,
      description: 'Teclado mecánico RGB para gamers',
      category: 'Accesorios',
      stock: 8,
      image: 'https://via.placeholder.com/300x225/FF6B6B/ffffff?text=Teclado'
    },
    {
      id: '4',
      name: 'Monitor 27"',
      price: 1200000,
      description: 'Monitor Full HD con panel IPS',
      category: 'Electrónica',
      stock: 12,
      image: 'https://via.placeholder.com/300x225/9B59B6/ffffff?text=Monitor'
    },
    {
      id: '5',
      name: 'Audífonos Bluetooth',
      price: 280000,
      description: 'Audífonos con cancelación de ruido',
      category: 'Audio',
      stock: 0,
      image: 'https://via.placeholder.com/300x225/F39C12/ffffff?text=Audifonos'
    },
    {
      id: '6',
      name: 'Webcam HD',
      price: 195000,
      description: 'Cámara web 1080p con micrófono integrado',
      category: 'Accesorios',
      stock: 22,
      image: 'https://via.placeholder.com/300x225/1ABC9C/ffffff?text=Webcam'
    }
  ];
};

export default apiClient;

