//Función que obtiene un pedido por su id
//
//Recibe: idPedido

const {Pedido} = require('../models');

const getPedido = async (idPedido) => {
  try {
    const pedido = await Pedido.findByPk(idPedido);

    // mapea los resultados 
    const pedidoMapped = {
      id: pedido.id,
      fecha: pedido.fecha,
      total: pedido.total,
    };

    return { success: true, pedido: pedidoMapped };
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return { success: false, message: 'Error al obtener el pedido', error: error.message };
  }
}
