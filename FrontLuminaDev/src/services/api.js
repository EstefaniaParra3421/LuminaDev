import axios from 'axios';

export const getApiBaseUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (process.env.REACT_APP_API_URL) {
    let url = process.env.REACT_APP_API_URL.trim();
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  }
  
  if (isDevelopment) {
    return '';
  }
  
  return 'https://backend-luminadev.vercel.app';
};

export const getImageBaseUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (process.env.REACT_APP_API_URL) {
    let url = process.env.REACT_APP_API_URL.trim();
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  }
  
  if (isDevelopment) {
    return 'http://localhost:4000';
  }
  
  return 'https://backend-luminadev.vercel.app';
};

const API_BASE_URL = getApiBaseUrl();

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

if (API_BASE_URL) {
  axiosConfig.baseURL = API_BASE_URL;
}

const apiClient = axios.create(axiosConfig);

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      
      if (status === 400 && process.env.NODE_ENV === 'development') {
        console.error('Error de validación:', error.response.data);
      } else if (status !== 400) {
        console.error('Error de respuesta:', error.response.data);
      }
      
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      console.error('Error de red:', error.message);
      
      if (error.code === 'ECONNREFUSED' && process.env.NODE_ENV === 'development') {
        console.error('El backend no está corriendo en localhost:4000');
      }
      
      if (error.code === 'ECONNABORTED') {
        console.error('Timeout: El servidor tardó más de 30 segundos en responder');
      }
    } else {
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return getMockProducts();
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    throw error;
  }
};

export const getRelatedProducts = async (categoryId, excludeId, limit = 4) => {
  try {
    const allProducts = await getProducts();
    
    const related = allProducts
      .filter(product => {
        const productCategory = product.categoria || product.category;
        const productId = product._id || product.id;
        return productCategory === categoryId && productId !== excludeId;
      })
      .slice(0, limit);
    
    return related;
  } catch (error) {
    console.error('Error al obtener productos relacionados:', error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
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

export const updateProduct = async (id, productData) => {
  try {
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

export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    throw error;
  }
};

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

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}:`, error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

export const createCart = async (usuarioId) => {
  try {
    const response = await apiClient.post('/cart', { usuarioId });
    return response.data;
  } catch (error) {
    console.error('Error al crear carrito:', error);
    throw error;
  }
};

export const getCart = async (usuarioId) => {
  try {
    const response = await apiClient.get(`/cart/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    throw error;
  }
};

export const addToCart = async (usuarioId, productoId, precio) => {
  try {
    const response = await apiClient.post('/cart/add', { 
      usuarioId, 
      productoId, 
      precio 
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      try {
        await createCart(usuarioId);
        const retryResponse = await apiClient.post('/cart/add', { 
          usuarioId, 
          productoId, 
          precio 
        });
        return retryResponse.data;
      } catch (createError) {
        console.error('Error al crear carrito o agregar producto:', createError);
        throw createError;
      }
    }
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};

export const removeFromCart = async (usuarioId, productoId, precio) => {
  try {
    const response = await apiClient.post('/cart/remove', { 
      usuarioId, 
      productoId, 
      precio 
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    throw error;
  }
};

export const clearCart = async (usuarioId) => {
  try {
    const response = await apiClient.post('/cart/clear', { usuarioId });
    return response.data;
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener orden ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await apiClient.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar orden ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await apiClient.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar categoría ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar categoría ${id}:`, error);
    throw error;
  }
};

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
