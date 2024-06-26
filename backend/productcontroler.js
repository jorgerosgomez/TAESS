const db = require('./database');
const bcrypt = require('bcryptjs');

const createProduct = async (name, description, stock, price, sales, stock_min) => {
  try {
    const query = 'INSERT INTO Products (name, description, stock, price, sales, stock_min) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, description, stock, price, sales, stock_min]);

    return { success: true, message: 'Producto registrado con éxito', productId: result.insertId };
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    return { success: false, message: 'Error al registrar el producto' };
  }
};

const modifyProduct = async (name, description, stock, price, sales, stock_min, productId) => {
  try {
    const query = 'UPDATE Products SET name = ?, description = ?, stock = ?, price = ?, sales = ?, stock_min = ? WHERE id = ?';
    const [result] = await db.execute(query, [name, description, stock, price, sales, stock_min, productId]);

    return { success: true, message: 'Producto modificado con éxito', productId: result.insertId };
  } catch (error) {
    console.error('Error al modificar el producto:', error);
    return { success: false, message: 'Error al modificar el producto' };
  }
};

const deleteProduct = async (productId) => {
  try {
    const query = 'DELETE FROM Products WHERE id = ?';
    const [result] = await db.execute(query, [productId]);

    if (result.affectedRows > 0) {
      return { success: true, message: 'Producto eliminado con éxito' };
    } else {
      return { success: false, message: 'No se encontró ningún producto con ese ID' };
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return { success: false, message: 'Error al eliminar el producto' };
  }
};

const getProducts = async () => {
  try {
    const query = 'SELECT * FROM Products'; 
    const [results] = await db.execute(query);

    if (results.length > 0) {
      return { success: true, products: results };
    } else {
      return { success: false, message: 'No se encontraron productos en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return { success: false, message: 'Error al obtener los productos' };
  }
};

module.exports = { getProducts, createProduct, modifyProduct, deleteProduct};
