import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Product API calls
export const productAPI = {
  // Get all products with filters
  getAllProducts: (params = {}) => {
    return api.get('/products', { params });
  },

  // Get single product
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  // Create product
  createProduct: (formData) => {
    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update product
  updateProduct: (id, formData) => {
    return api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete product
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },
};

export default api;