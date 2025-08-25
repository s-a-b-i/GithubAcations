import { Router } from 'express';
const router = Router();
import upload from '../middlewares/upload.js'; // Import default export
import productController from '../controllers/productController.js';

// Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct); // Use upload.single
router.put('/:id', upload.single('image'), productController.updateProduct); // Use upload.single
router.delete('/:id', productController.deleteProduct);

export default router;