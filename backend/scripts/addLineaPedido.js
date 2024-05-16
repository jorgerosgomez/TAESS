//Función que recibe los campos de una nueva línea de pedido y los agrega a la base de datos
//
//Recibe: idCliente, idBarbero, fecha_pedido.

const OrderLine = require('../models');

const createOrderLine = async function (idCliente, idBarbero, fecha_pedido) {
  try {
    // Crea la nueva línea de pedido
    const lineaPedido = await OrderLine.create({
      id_client: idCliente,
      id_barber: idBarbero,
      date_order: fecha_pedido,
    });

    return { success: true, lineaPedido: lineaPedido };
  } catch (error) {
    console.error('Error al agregar la línea de pedido:', error);
    return { success: false, message: 'Error al agregar la línea de pedido', error: error.message };
  }
}
