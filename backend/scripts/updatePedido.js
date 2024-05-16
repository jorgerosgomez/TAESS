//Función que recibe un id y unos parámetros correspondientes a los campos del modelo Pedido, para actualizar un registro en la base de datos.
//
//Recibe: id, producto, precio, cantidad, idLineaPedido.

const Order = require('../../models');

const modifyOrder = async function (id, producto, precio, cantidad) {
  try {
    // Busca el pedido por id
    const pedido = await Order.findOne({
      where: {
        id_order: id
      }
    });
    if (!pedido) {
      return { success: false, message: 'Pedido no encontrado' };
    }
    // Actualiza los campos
    if (producto) {
      pedido.id_product = producto;
    }
    if (precio) {
      pedido.price = precio;
    }
    if (cantidad) {
      pedido.amount = cantidad;
    }
    await pedido.save();
    return { success: true, pedido: pedido };
  }
  catch (error) {
    console.error('Error al actualizar el pedido:', error);
    return { success: false, message: 'Error al actualizar el pedido', error: error.message };
  }
}
