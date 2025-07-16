import { Router } from 'express';
import ProductController from '../controllers/products.controller.js';

const ProductsRouter = Router()

ProductsRouter.get('/', ProductController.getAllProducts);
ProductsRouter.get('/disponibles', ProductController.getProductsAvailable);
ProductsRouter.get('/:id', ProductController.searchById)

ProductsRouter.post('/', ProductController.createProduct);

ProductsRouter.put('/:id', ProductController.updateProductById);

ProductsRouter.delete('/:id', ProductController.deleteProductById);

export default ProductsRouter
