//Función que recibe un id y unos parámetros correspondientes a los campos del modelo Pedido, para actualizar un registro en la base de datos.
//
//Recibe: id, producto, precio, cantidad, idLineaPedido.

const Pedido = require('../../models');

module.exports = async function updatePedido(id, producto, precio, cantidad, idLineaPedido) {
  try {
    // Busca el pedido por id
    const pedido = await Pedido.findOne({
      where: {
        id: id
      }
    });
    if (!pedido) {
      return { success: false, message: 'Pedido no encontrado' };
    }
    // Actualiza los campos
    if (producto) {
      pedido.producto = producto;
    }
    if (precio) {
      pedido.precio = precio;
    }
    if (cantidad) {
      pedido.cantidad = cantidad;
    }
    if (idLineaPedido) {
      pedido.idLineaPedido = idLineaPedido;
    }
    await pedido.save();
    return { success: true, pedido: pedido };
  }
  catch (error) {
    console.error('Error al actualizar el pedido:', error);
    return { success: false, message: 'Error al actualizar el pedido', error: error.message };
  }
}
