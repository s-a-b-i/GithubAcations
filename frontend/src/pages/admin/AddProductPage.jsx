import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductForm from '../../components/common/ProductForm';
import { productAPI } from '../../services/api';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await productAPI.createProduct(formData);
      alert('Product created successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Create a new product listing</p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default AddProductPage;