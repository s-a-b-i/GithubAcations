import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import ProductForm from '../../components/common/ProductForm';
import Loading from '../../components/common/Loading';
import { productAPI } from '../../services/api';

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setPageLoading(true);
      const response = await productAPI.getProduct(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      navigate('/admin/products');
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await productAPI.updateProduct(id, formData);
      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.message || 'Error updating product');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600 mt-2">Update product information</p>
      </div>

      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </AdminLayout>
  );
};

export default EditProductPage;