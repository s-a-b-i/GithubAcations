import Product from '../models/Product.js';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';

// Get all products with optional filters
const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      // Handle multiple categories (comma-separated)
      const categories = category.split(',').map(cat => cat.trim());
      query.category = { $in: categories };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    // Validate required fields
    if (!name || !category || !price || !description) {
      // If file was uploaded, delete it
      if (req.file) {
        unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const productData = {
      name,
      category,
      price: parseFloat(price),
      description
    };

    // Add image path if file was uploaded
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    // If file was uploaded, delete it on error
    if (req.file) {
      unlinkSync(req.file.path);
    }
    
    console.error('Create product error:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description } = req.body;

    const product = await Product.findById(id);
    
    if (!product) {
      // If file was uploaded, delete it
      if (req.file) {
        unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = parseFloat(price);
    if (description) product.description = description;

    // Update image if new file was uploaded
    if (req.file) {
      // Delete old image if it exists
      if (product.image) {
        const oldImagePath = join(__dirname, '..', product.image);
        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
        }
      }
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    // If file was uploaded, delete it on error
    if (req.file) {
      unlinkSync(req.file.path);
    }
    
    console.error('Update product error:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete associated image file
    if (product.image) {
      const imagePath = join(__dirname, '..', product.image);
      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};