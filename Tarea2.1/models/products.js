import pool from '../config/db.js';

export const getProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
};

export const getProductID = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
};

export const getAvailableProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE disponible = true');
  return rows;
};

export const createProduct = async (product) => {
  
    const cnn = await pool.getConnection();

    const { nombre, precio, descripcion, disponible,categoria_id } = product;

    try {

        cnn.beginTransaction();

        const confirmQuery = 'SELECT * from categorias';

        const [confirmResult] = await cnn.execute(confirmQuery);

        if (confirmResult.length === 0) {
            throw new Error('No hay categorías disponibles para asignar al producto');
        }

        const categoryExists = confirmResult.some(cat => cat.id === categoria_id);

        if (!categoryExists) {
            throw new Error('La categoría del producto no existe');
        }
        else{

           const query = 'INSERT INTO productos (nombre, precio, descripcion, disponible, categoria_id) VALUES (?, ?, ?,?, ?)';

          const [result] = await cnn.execute(query,[ nombre, precio, descripcion, disponible, categoria_id ]);

          cnn.commit();
          return {id: result.id , ...product };

        }

    } catch (error) {
        cnn.rollback();
        throw error;
    } finally {
        cnn.release();
    }
};

export const updateProduct = async (id, product) => {
  
  const cnn = await pool.getConnection();

  try {
    cnn.beginTransaction();

    const { nombre, precio, descripcion, disponible, categoria_id } = product;

    const query = 'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, disponible = ?, categoria_id = ? WHERE id = ?';
    const [result] = await cnn.execute(query, [nombre, precio, descripcion, disponible, categoria_id, id]);

    if (result.affectedRows === 0) {
      throw new Error('Producto no encontrado');
    }

    cnn.commit();
    return { id, ...product };
  
  }
  catch (error) {
    cnn.rollback();
    throw error;
  } finally {
    cnn.release();
  }
};

export const deleteProduct = async (id) => {
  const cnn = await pool.getConnection();

  try {
    cnn.beginTransaction();

    const query = 'DELETE FROM productos WHERE id = ?';
    const [result] = await cnn.execute(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error('Producto no encontrado');
    }

    cnn.commit();
    return { message: 'Producto eliminado exitosamente' };
  } catch (error) {
    cnn.rollback();
    throw error;
  } finally {
    cnn.release();
  }
};
