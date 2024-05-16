//Función que recibe el id de una LineaPedido y devuelve la información de esta.
//
//Recibe: idLineaPedido

const Orderline = require('../models');

const getOrderline = async (idLineaPedido) => {
  try {
    const lineaPedido = await LineaPedido.findByPk(idLineaPedido);

    // mapea los resultados 
    const lineaPedidoMapped = {
      id: lineaPedido.id,
      id_client: lineaPedido.id_client,
      id_barber: lineaPedido.id_barber,
      date_order: lineaPedido.date_order,
    };

    return { success: true, lineaPedido: lineaPedidoMapped };
  } catch (error) {
    console.error('Error al obtener la linea de pedido:', error);
    return { success: false, message: 'Error al obtener la linea de pedido', error: error.message };
  }
}
