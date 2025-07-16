import {getProducts,getProductID,getAvailableProducts,createProduct, updateProduct, deleteProduct} from '../models/products.js';
import { validateProduct } from '../schemas/products.schema.js';


export default class ProductController{

    static async getAllProducts(req,res){

        try {
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
        }       
    }

    static async searchById(req,res) {

        const { id } = req.params;
        const parsedId = Number(id);

        if (isNaN(parsedId)){
            return res.status(400).json({ message: 'El ID debe ser un número' });
        }

        try {
            const product = await getProductID(parsedId);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
        }
    }

    static async getProductsAvailable(req,res){

        try {
            const availableProducts = await getAvailableProducts();
            res.status(200).json(availableProducts);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos disponibles', error: error.message });
        }

    }

    static async createProduct(req,res){

        const product = req.body;

        const { success, error } = validateProduct(product);

        if (!success) {
            return res.status(400).json({ message: 'Datos invalidos ', errors: error.message });
        }

        try {
            const newProduct = await createProduct(product);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error: error.message });
        }
        
            
    }

    static async updateProductById(req, res) {

        const { id } = req.params
        const parsedId = Number(id)

        if (isNaN(parsedId)){
            return res.status(400).json({ message: 'El ID debe ser un número' });
        }

        const data = req.body;

        const { success, error } = validateProduct(data);

        if (!success) {
            return res.status(400).json({ message: 'Datos invalidos ', errors: error.message });
        }

        try {
            const updatedProduct = await updateProduct(parsedId, data);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({
                message: 'Producto actualizado exitosamente',
                product: updatedProduct
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
        }
    }

    static async deleteProductById(req,res){
        const { id } = req.params;
        const parsedId = Number(id);

        if (isNaN(parsedId)){
            return res.status(400).json({ message: 'El ID debe ser un número' });
        }

        try {
            const deletedProduct = await deleteProduct(parsedId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
        }
    }
}