//Función  que recibe un id y unos parámetros correspondientes a los campos del modelo LineaPedido, para actualizar un registro en la base de datos.
//
//Recibe: id, idCliente, idBarbero, fecha_pedido.

const OrderLine = require('../../models');

const modifyOrderLine = async function (id, idCliente, idBarbero, fecha_pedido) {
  try {
    // Busca la linea de pedido por id
    const lineaPedido = await OrderLine.findOne({
      where: {
        id: id
      }
    });
    if (!lineaPedido) {
      return { success: false, message: 'Linea de pedido no encontrada' };
    }
    // Actualiza los campos
    if (idCliente) {
      lineaPedido.id_client = idCliente;
    }
    if (idBarbero) {
      lineaPedido.id_barber = idBarbero;
    }
    if (fecha_pedido) {
      lineaPedido.date_order = fecha_pedido;
    }
    await lineaPedido.save();
    return { success: true, lineaPedido: lineaPedido };
  }
  catch (error) {
    console.error('Error al actualizar la linea de pedido:', error);
    return { success: false, message: 'Error al actualizar la linea de pedido', error: error.message };
  }
}
