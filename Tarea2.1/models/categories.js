import { ca } from "zod/v4/locales";
import pool from "../config/db.js";

export const getCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM categorias");
  return rows;
}

export const getCategoryById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [id]);

  if (rows.length === 0) {
    throw new Error(`Categoría no encontrada`);
  }
  return rows[0];

}

export const createCategory = async (data) => {

  const [result] = await pool.query("INSERT INTO categorias (nombre) VALUES (?)", [data.nombre]);

  return {message: 'Categoria creada con exito', 
    ...data}
}

export const deleteCategoryById = async (id) => {

  const confirmQuery = 'SELECT * FROM productos WHERE categoria_id = ?';
  
  const cnn = await pool.getConnection();

  try {

    cnn.beginTransaction();

    const [confirm] = await cnn.query(confirmQuery, [id]);

    if (confirm.length > 0) {
      throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
    }

    const [result] = await cnn.query("DELETE FROM categorias WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error('No existe una categoría con este ID');
    }

    await cnn.commit();
    return { message: 'Categoría eliminada con éxito' };
  } catch (error) {
    await cnn.rollback();
    throw error;
  } finally {
    cnn.release();
  }


}

export const updateCategoryById = async (id,data) => {

  const [result] = await pool.query("UPDATE categorias SET nombre = ? WHERE id = ?", [data.nombre, id]);

  if (result.affectedRows === 0) {
    throw new Error ('No existe una categoria con este ID')
  }

  return {message: 'Categoria actualizada con exito', ...data }
}