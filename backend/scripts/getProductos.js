//Función que extrae todos los productos de la base de datos y los devuelve en un objeto JSON

const {Product} = require('../models');

const getProductos = async () => {
  try {
    const productos = await Product.findAll();

    // mapea los resultados 
    const productosMapped = productos.map(producto => {
      return {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
      };
    });

    return { success: true, productos: productosMapped };
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return { success: false, message: 'Error al obtener los productos', error: error.message };
  }
}
