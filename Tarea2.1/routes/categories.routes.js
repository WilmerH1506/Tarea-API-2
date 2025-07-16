import {Router} from 'express';
import CategoryController from '../controllers/categories.controller.js'

const CategoriesRouter = Router();

CategoriesRouter.get('/', CategoryController.getAllCategories);
CategoriesRouter.get('/:id', CategoryController.getCategoryById);

CategoriesRouter.post('/', CategoryController.createCategory);

CategoriesRouter.delete('/:id', CategoryController.deleteCategory);

CategoriesRouter.put('/:id', CategoryController.updateCategory);

export default CategoriesRouter;

