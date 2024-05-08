//Función que recibe el id de una LineaPedido y devuelve la información de esta.
//
//Recibe: idLineaPedido

const {LineaPedido} = require('../models');

const getLineaPedido = async (idLineaPedido) => {
  try {
    const lineaPedido = await LineaPedido.findByPk(idLineaPedido);

    // mapea los resultados 
    const lineaPedidoMapped = {
      id: lineaPedido.id,
      cantidad: lineaPedido.cantidad,
      precio: lineaPedido.precio,
      productoId: lineaPedido.productoId,
      pedidoId: lineaPedido.pedidoId,
    };

    return { success: true, lineaPedido: lineaPedidoMapped };
  } catch (error) {
    console.error('Error al obtener la linea de pedido:', error);
    return { success: false, message: 'Error al obtener la linea de pedido', error: error.message };
  }
}
