import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import ProductsPage from './pages/user/ProductsPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root to products */}
          <Route path="/" element={<Navigate to="/products" replace />} />
          
          {/* User Routes */}
          <Route path="/products" element={<ProductsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;