import {z} from 'zod';


const CategoriesSchema = z.object({

    nombre: z.string().min(2, "El nombre es obligatorio"),

})

export const validateCategory = (data) => {

    const result = CategoriesSchema.safeParse(data);

    if (result.success) {
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }


}