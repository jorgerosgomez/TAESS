//Función que extrae todas las líneas de pedido de la base de datos y las devuelve en un objeto JSON

const Orderline = require('../models');

const getOrderlines = async () => {
  try {
    const lineaPedidos = await Orderline.findAll();

    // mapea los resultados 
    const lineaPedidosMapped = lineaPedidos.map(lineaPedido => {
      return {
        id_client: lineaPedido.id_client,
        id_barber: lineaPedido.id_barber,
        date_order: lineaPedido.date_order,
      };
    });

    return { success: true, lineaPedidos: lineaPedidosMapped };
  } catch (error) {
    console.error('Error al obtener las líneas de pedido:', error);
    return { success: false, message: 'Error al obtener las líneas de pedido', error: error.message };
  }
}
