import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminRoute from './components/AdminRoute/AdminRoute';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Sitemap from './pages/Sitemap/Sitemap';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Rutas de administración sin Header/Footer */}
              <Route path="/admin123" element={<AdminLogin />} />
              <Route
                path="/admin123/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              {/* Rutas normales con Header/Footer */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <main className="app__main">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/sitemap" element={<Sitemap />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

