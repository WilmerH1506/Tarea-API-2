import { validateCategory } from "../schemas/categories.schema.js";
import { getCategories, getCategoryById,createCategory,deleteCategoryById,updateCategoryById} from "../models/categories.js";

export default class CategoryController {

    static async getAllCategories(req, res) {
        try {
            const categories = await getCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
        }
    }

    static async getCategoryById(req, res) {
        const { id } = req.params;
        try {
            const category = await getCategoryById(id);
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async createCategory (req,res) {

        const { nombre } = req.body;

        const validation = validateCategory({ nombre });

        if (!validation.success) {
            return res.status(400).json({ message: 'Datos invalidos', error: validation.error.errors });
        }

        try {
            const newCategory = await createCategory({ nombre });
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
        }
    }

    static async deleteCategory(req, res) {
        const { id } = req.params;

        try {
            const result = await deleteCategoryById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateCategory(req, res) {
        const { id } = req.params;
        const { nombre } = req.body;

        const validation = validateCategory({ nombre });

        if (!validation.success) {
            return res.status(400).json({ message: 'Datos invalidos', error: validation.error.errors });
        }

        try {
            const updatedCategory = await updateCategoryById(id, { nombre });
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

   
}   