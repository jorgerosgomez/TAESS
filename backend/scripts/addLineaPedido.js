//Función que recibe los campos de una nueva línea de pedido y los agrega a la base de datos
//
//Recibe: idCliente, idBarbero, fecha_pedido.

const LineaPedido = require('../models');

module.exports = async function addLineaPedido(idCliente, idBarbero, fecha_pedido) {
  try {
    // Crea la nueva línea de pedido
    const lineaPedido = await LineaPedido.create({
      idCliente: idCliente,
      idBarbero: idBarbero,
      fecha_pedido: fecha_pedido,
    });

    return { success: true, lineaPedido: lineaPedido };
  } catch (error) {
    console.error('Error al agregar la línea de pedido:', error);
    return { success: false, message: 'Error al agregar la línea de pedido', error: error.message };
  }
}
