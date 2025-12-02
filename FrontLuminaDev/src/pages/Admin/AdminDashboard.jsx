import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getOrders, 
  deleteOrder,
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getImageBaseUrl
} from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('pedidos');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    cantidad: '',
    portada: null,
    galeria: []
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: 'usuario'
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    nombre: '',
    descripcion: ''
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'productos') {
        const productsData = await getProducts();
        setProducts(productsData);
      } else if (activeTab === 'pedidos') {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } else if (activeTab === 'usuarios') {
        const usersData = await getUsers();
        setUsers(usersData);
      } else if (activeTab === 'categorias') {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      }
      // Siempre cargar categorías para el select de productos
      if (activeTab === 'productos') {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      }
    } catch (error) {
      showToast('Error al cargar los datos', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeTab, showToast]);

  useEffect(() => {
    // Verificar que el usuario sea administrador
    if (!user || user.rol !== 'administrador') {
      navigate('/admin123');
      return;
    }
    loadData();
  }, [user, navigate, loadData]);

  // Cargar categorías cuando se abre el modal de productos
  useEffect(() => {
    const loadCategoriesForModal = async () => {
      if (showProductModal && categories.length === 0) {
        try {
          const categoriesData = await getCategories();
          setCategories(categoriesData);
        } catch (error) {
          console.error('Error al cargar categorías:', error);
        }
      }
    };
    loadCategoriesForModal();
  }, [showProductModal, categories.length]);

  const handleLogout = () => {
    logout();
    navigate('/admin123');
    showToast('Sesión cerrada', 'success');
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await deleteProduct(id);
      showToast('Producto eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showToast('Error al eliminar el producto', 'error');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta orden?')) {
      return;
    }

    try {
      await deleteOrder(id);
      showToast('Orden eliminada exitosamente', 'success');
      loadData();
    } catch (error) {
      showToast('Error al eliminar la orden', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }

    try {
      await deleteUser(id);
      showToast('Usuario eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      const errorMessage = error.response?.data?.mensaje || 'Error al eliminar el usuario';
      showToast(errorMessage, 'error');
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        // Actualizar usuario - solo enviar campos que se quieren actualizar
        const updateData = {
          nombre: userForm.nombre,
          correo: userForm.correo,
          rol: userForm.rol
        };
        // Solo incluir contraseña si se proporcionó una nueva
        if (userForm.contraseña && userForm.contraseña.trim() !== '') {
          updateData.contraseña = userForm.contraseña;
        }
        await updateUser(editingUser._id, updateData);
        showToast('Usuario actualizado exitosamente', 'success');
      } else {
        // Crear nuevo usuario
        await createUser(userForm);
        showToast('Usuario creado exitosamente', 'success');
      }

      setShowUserModal(false);
      setEditingUser(null);
      setUserForm({
        nombre: '',
        correo: '',
        contraseña: '',
        rol: 'usuario'
      });
      loadData();
    } catch (error) {
      const errorMessage = error.response?.data?.mensaje || 'Error al guardar el usuario';
      showToast(errorMessage, 'error');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      nombre: user.nombre || '',
      correo: user.correo || '',
      contraseña: '', // No mostrar contraseña al editar
      rol: user.rol || 'usuario'
    });
    setShowUserModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      return;
    }

    try {
      await deleteCategory(id);
      showToast('Categoría eliminada exitosamente', 'success');
      loadData();
    } catch (error) {
      const errorMessage = error.response?.data?.mensaje || 'Error al eliminar la categoría';
      showToast(errorMessage, 'error');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, categoryForm);
        showToast('Categoría actualizada exitosamente', 'success');
      } else {
        await createCategory(categoryForm);
        showToast('Categoría creada exitosamente', 'success');
      }

      setShowCategoryModal(false);
      setEditingCategory(null);
      setCategoryForm({
        nombre: '',
        descripcion: ''
      });
      loadData();
    } catch (error) {
      const errorMessage = error.response?.data?.mensaje || 'Error al guardar la categoría';
      showToast(errorMessage, 'error');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      nombre: category.nombre || '',
      descripcion: category.descripcion || ''
    });
    setShowCategoryModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let productData;
      
      // Si hay una imagen nueva, usar FormData
      if (productForm.portada) {
        const formData = new FormData();
        formData.append('nombre', productForm.nombre);
        formData.append('precio', productForm.precio);
        formData.append('descripcion', productForm.descripcion);
        formData.append('categoria', productForm.categoria);
        formData.append('cantidad', productForm.cantidad);
        formData.append('portada', productForm.portada);
        productData = formData;
      } else {
        // Si no hay imagen nueva, usar JSON
        productData = {
          nombre: productForm.nombre,
          precio: parseFloat(productForm.precio),
          descripcion: productForm.descripcion,
          categoria: productForm.categoria,
          cantidad: parseInt(productForm.cantidad) || 0
        };
        
        // Si estamos editando y no hay nueva imagen, mantener la imagen existente
        if (editingProduct && editingProduct.portada) {
          productData.portada = editingProduct.portada;
        }
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        showToast('Producto actualizado exitosamente', 'success');
      } else {
        await createProduct(productData);
        showToast('Producto creado exitosamente', 'success');
      }

      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        cantidad: '',
        portada: null,
        galeria: []
      });
      loadData();
    } catch (error) {
      showToast('Error al guardar el producto', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      nombre: product.nombre || '',
      precio: product.precio || '',
      descripcion: product.descripcion || '',
      categoria: product.categoria || '',
      cantidad: product.cantidad || '',
      portada: null,
      galeria: []
    });
    setShowProductModal(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <div className="admin-dashboard__header-content">
          <h1 className="admin-dashboard__title">Panel de Administración</h1>
          <div className="admin-dashboard__user-info">
            <span>👤 {user?.nombre}</span>
            <button onClick={handleLogout} className="admin-dashboard__logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="admin-dashboard__tabs">
        <button
          className={`admin-dashboard__tab ${activeTab === 'pedidos' ? 'active' : ''}`}
          onClick={() => setActiveTab('pedidos')}
        >
          📦 Pedidos
        </button>
        <button
          className={`admin-dashboard__tab ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          🛍️ Productos
        </button>
        <button
          className={`admin-dashboard__tab ${activeTab === 'usuarios' ? 'active' : ''}`}
          onClick={() => setActiveTab('usuarios')}
        >
          👥 Usuarios
        </button>
        <button
          className={`admin-dashboard__tab ${activeTab === 'categorias' ? 'active' : ''}`}
          onClick={() => setActiveTab('categorias')}
        >
          🏷️ Categorías
        </button>
      </div>

      <div className="admin-dashboard__content">
        {loading ? (
          <div className="admin-dashboard__loading">Cargando...</div>
        ) : (
          <>
            {activeTab === 'pedidos' && (
              <div className="admin-dashboard__section">
                <h2 className="admin-dashboard__section-title">Gestión de Pedidos</h2>
                {orders.length === 0 ? (
                  <p className="admin-dashboard__empty">No hay pedidos registrados</p>
                ) : (
                  <div className="admin-dashboard__table-container">
                    <table className="admin-dashboard__table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Usuario ID</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Fecha</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td>{order._id.substring(0, 8)}...</td>
                            <td>{order.usuarioId}</td>
                            <td>{order.productos?.length || 0} productos</td>
                            <td>{formatPrice(order.total || 0)}</td>
                            <td>{formatDate(order.fecha)}</td>
                            <td>
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="admin-dashboard__delete-btn"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'productos' && (
              <div className="admin-dashboard__section">
                <div className="admin-dashboard__section-header">
                  <h2 className="admin-dashboard__section-title">Gestión de Productos</h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({
                        nombre: '',
                        precio: '',
                        descripcion: '',
                        categoria: '',
                        cantidad: '',
                        portada: null,
                        galeria: []
                      });
                      setShowProductModal(true);
                    }}
                    className="admin-dashboard__add-btn"
                  >
                    + Nuevo Producto
                  </button>
                </div>
                {products.length === 0 ? (
                  <p className="admin-dashboard__empty">No hay productos registrados</p>
                ) : (
                  <div className="admin-dashboard__products-grid">
                    {products.map((product) => (
                      <div key={product._id} className="admin-dashboard__product-card">
                        <div className="admin-dashboard__product-image">
                          {product.portada ? (
                            <img
                              src={`${getImageBaseUrl()}/uploads/products/${product.portada}`}
                              alt={product.nombre}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/200x150?text=Sin+Imagen';
                              }}
                            />
                          ) : (
                            <div className="admin-dashboard__product-placeholder">
                              Sin imagen
                            </div>
                          )}
                        </div>
                        <div className="admin-dashboard__product-info">
                          <h3>{product.nombre}</h3>
                          <p className="admin-dashboard__product-price">
                            {formatPrice(product.precio || 0)}
                          </p>
                          <p className="admin-dashboard__product-category">
                            {product.categoria}
                          </p>
                          <div className="admin-dashboard__product-actions">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="admin-dashboard__edit-btn"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="admin-dashboard__delete-btn"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categorias' && (
              <div className="admin-dashboard__section">
                <div className="admin-dashboard__section-header">
                  <h2 className="admin-dashboard__section-title">Gestión de Categorías</h2>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setCategoryForm({
                        nombre: '',
                        descripcion: ''
                      });
                      setShowCategoryModal(true);
                    }}
                    className="admin-dashboard__add-btn"
                  >
                    + Nueva Categoría
                  </button>
                </div>
                {categories.length === 0 ? (
                  <p className="admin-dashboard__empty">No hay categorías registradas</p>
                ) : (
                  <div className="admin-dashboard__table-container">
                    <table className="admin-dashboard__table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Descripción</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category._id}>
                            <td>{category._id.substring(0, 8)}...</td>
                            <td>{category.nombre}</td>
                            <td>{category.descripcion || '-'}</td>
                            <td>
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="admin-dashboard__edit-btn"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category._id)}
                                className="admin-dashboard__delete-btn"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usuarios' && (
              <div className="admin-dashboard__section">
                <div className="admin-dashboard__section-header">
                  <h2 className="admin-dashboard__section-title">Gestión de Usuarios</h2>
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setUserForm({
                        nombre: '',
                        correo: '',
                        contraseña: '',
                        rol: 'usuario'
                      });
                      setShowUserModal(true);
                    }}
                    className="admin-dashboard__add-btn"
                  >
                    + Nuevo Usuario
                  </button>
                </div>
                {users.length === 0 ? (
                  <p className="admin-dashboard__empty">No hay usuarios registrados</p>
                ) : (
                  <div className="admin-dashboard__table-container">
                    <table className="admin-dashboard__table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Correo</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id.substring(0, 8)}...</td>
                            <td>{user.nombre}</td>
                            <td>{user.correo}</td>
                            <td>
                              <span className={`admin-dashboard__role-badge ${user.rol === 'administrador' ? 'admin' : 'user'}`}>
                                {user.rol || 'usuario'}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="admin-dashboard__edit-btn"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="admin-dashboard__delete-btn"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showProductModal && (
        <div className="admin-dashboard__modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="admin-dashboard__modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-dashboard__modal-title">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <form onSubmit={handleProductSubmit} className="admin-dashboard__form">
              <div className="admin-dashboard__form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={productForm.nombre}
                  onChange={(e) => setProductForm({ ...productForm, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Precio</label>
                <input
                  type="number"
                  value={productForm.precio}
                  onChange={(e) => setProductForm({ ...productForm, precio: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Descripción</label>
                <textarea
                  value={productForm.descripcion}
                  onChange={(e) => setProductForm({ ...productForm, descripcion: e.target.value })}
                  required
                  rows="4"
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Categoría</label>
                <div className="admin-dashboard__select-wrapper">
                  <select
                    value={productForm.categoria}
                    onChange={(e) => setProductForm({ ...productForm, categoria: e.target.value })}
                    required
                    className="admin-dashboard__select"
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.nombre}>
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-dashboard__form-group">
                <label>Cantidad</label>
                <input
                  type="number"
                  value={productForm.cantidad}
                  onChange={(e) => setProductForm({ ...productForm, cantidad: e.target.value })}
                  required
                  min="0"
                  step="1"
                  placeholder="Cantidad disponible"
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Imagen de Portada</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductForm({ ...productForm, portada: e.target.files[0] })}
                />
              </div>
              <div className="admin-dashboard__form-actions">
                <button type="button" onClick={() => setShowProductModal(false)}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUserModal && (
        <div className="admin-dashboard__modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="admin-dashboard__modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-dashboard__modal-title">
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <form onSubmit={handleUserSubmit} className="admin-dashboard__form">
              <div className="admin-dashboard__form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={userForm.nombre}
                  onChange={(e) => setUserForm({ ...userForm, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  value={userForm.correo}
                  onChange={(e) => setUserForm({ ...userForm, correo: e.target.value })}
                  required
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Contraseña {editingUser && '(dejar vacío para mantener la actual)'}</label>
                <input
                  type="password"
                  value={userForm.contraseña}
                  onChange={(e) => setUserForm({ ...userForm, contraseña: e.target.value })}
                  required={!editingUser}
                  minLength={4}
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Rol</label>
                <div className="admin-dashboard__select-wrapper">
                  <select
                    value={userForm.rol}
                    onChange={(e) => setUserForm({ ...userForm, rol: e.target.value })}
                    required
                    className="admin-dashboard__select"
                  >
                    <option value="usuario">👤 Usuario</option>
                    <option value="administrador">👑 Administrador</option>
                  </select>
                </div>
              </div>
              <div className="admin-dashboard__form-actions">
                <button type="button" onClick={() => setShowUserModal(false)}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="admin-dashboard__modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="admin-dashboard__modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-dashboard__modal-title">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <form onSubmit={handleCategorySubmit} className="admin-dashboard__form">
              <div className="admin-dashboard__form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={categoryForm.nombre}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nombre: e.target.value })}
                  required
                  placeholder="Ej: Electrónica, Ropa, etc."
                />
              </div>
              <div className="admin-dashboard__form-group">
                <label>Descripción</label>
                <textarea
                  value={categoryForm.descripcion}
                  onChange={(e) => setCategoryForm({ ...categoryForm, descripcion: e.target.value })}
                  rows="3"
                  placeholder="Descripción opcional de la categoría"
                />
              </div>
              <div className="admin-dashboard__form-actions">
                <button type="button" onClick={() => setShowCategoryModal(false)}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

