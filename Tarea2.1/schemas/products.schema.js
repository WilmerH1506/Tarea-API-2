import {z} from 'zod';

const productSchema = z.object({

    "nombre": z.string().min(1, { message: 'El nombre es obligatorio' }),
    "precio": z.number().positive({ message: 'El precio debe ser un número positivo' }),
    "descripcion": z.string().min(10, { message: 'La descripción debe tener minimo 10 caracteres' }),
    "disponible": z.boolean().default(true),
    "categoria_id": z.number().int().positive()

}).strict()

export const validateProduct = (product) => {
    return productSchema.safeParse(product)
}
