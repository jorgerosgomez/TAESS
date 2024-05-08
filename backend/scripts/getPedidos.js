//Función que extrae los pedidos de la base de datos y los devielve en un objeto JSON

const {Pedido} = require('../models');

const getPedidos = async () => {
  try {
    const pedidos = await Pedido.findAll();

    // mapea los resultados 
    const pedidosMapped = pedidos.map(pedido => {
      return {
        id: pedido.id,
        fecha: pedido.fecha,
        estado: pedido.estado,
        clienteId: pedido.clienteId,
      };
    });

    return { success: true, pedidos: pedidosMapped };
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return { success: false, message: 'Error al obtener los pedidos', error: error.message };
  }
}
