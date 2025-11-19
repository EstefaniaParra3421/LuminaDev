import axios from 'axios';

// URL base de la API
// En desarrollo: usa el proxy configurado en package.json (http://localhost:4000)
// En producción: usa la variable de entorno REACT_APP_API_URL configurada en Vercel
const getApiBaseUrl = () => {
  // Detectar si estamos en desarrollo o producción
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Si está configurada la variable de entorno, usarla (tanto en dev como en prod)
  if (process.env.REACT_APP_API_URL) {
    // Limpiar la URL: eliminar espacios y barras finales
    let url = process.env.REACT_APP_API_URL.trim();
    // Asegurar que no termine con barra
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  }
  
  // En desarrollo sin variable de entorno, usar el proxy (retornar vacío)
  if (isDevelopment) {
    return '';
  }
  
  // En producción sin variable de entorno, usar la URL por defecto del backend en Vercel
  return 'https://backend-luminadev.vercel.app';
};

const API_BASE_URL = getApiBaseUrl();

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
    // Si es FormData, usar configuración especial para multipart/form-data
    const isFormData = productData instanceof FormData;
    const config = isFormData
      ? {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      : {};

    const response = await apiClient.post('/products', productData, config);
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
    // Si es FormData, usar configuración especial para multipart/form-data
    const isFormData = productData instanceof FormData;
    const config = isFormData
      ? {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      : {};

    const response = await apiClient.put(`/products/${id}`, productData, config);
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
 * Obtener todos los usuarios (solo para administradores)
 */
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Crear un nuevo usuario (solo para administradores)
 */
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

/**
 * Actualizar un usuario (solo para administradores)
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar un usuario (solo para administradores)
 */
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error);
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

// ============= ÓRDENES =============

/**
 * Obtener todas las órdenes
 */
export const getOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};

/**
 * Obtener una orden por ID
 */
export const getOrderById = async (id) => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener orden ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar una orden
 */
export const deleteOrder = async (id) => {
  try {
    const response = await apiClient.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar orden ${id}:`, error);
    throw error;
  }
};

// ============= CATEGORÍAS =============

/**
 * Obtener todas las categorías
 */
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

/**
 * Crear una nueva categoría
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

/**
 * Actualizar una categoría
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await apiClient.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar categoría ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar una categoría
 */
export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar categoría ${id}:`, error);
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

