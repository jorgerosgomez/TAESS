//Función  que recibe un id y unos parámetros correspondientes a los campos del modelo LineaPedido, para actualizar un registro en la base de datos.
//
//Recibe: id, idCliente, idBarbero, fecha_pedido.

const LineaPedido = require('../../models');

module.exports = async function updateLineaPedido(id, idCliente, idBarbero, fecha_pedido) {
  try {
    // Busca la linea de pedido por id
    const lineaPedido = await LineaPedido.findOne({
      where: {
        id: id
      }
    });
    if (!lineaPedido) {
      return { success: false, message: 'Linea de pedido no encontrada' };
    }
    // Actualiza los campos
    if (idCliente) {
      lineaPedido.idCliente = idCliente;
    }
    if (idBarbero) {
      lineaPedido.idBarbero = idBarbero;
    }
    if (fecha_pedido) {
      lineaPedido.fecha_pedido = fecha_pedido;
    }
    await lineaPedido.save();
    return { success: true, lineaPedido: lineaPedido };
  }
  catch (error) {
    console.error('Error al actualizar la linea de pedido:', error);
    return { success: false, message: 'Error al actualizar la linea de pedido', error: error.message };
  }
}
