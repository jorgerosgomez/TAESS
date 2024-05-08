//Función que obtiene un producto por su id
//
//Recibe: idProducto

const {Producto} = require('../models');

const getProducto = async (idProducto) => {
  try {
    const producto = await Producto.findByPk(idProducto);

    // mapea los resultados 
    const productoMapped = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
    };

    return { success: true, producto: productoMapped };
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return { success: false, message: 'Error al obtener el producto', error: error.message };
  }
}
