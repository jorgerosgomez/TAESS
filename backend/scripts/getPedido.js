//Función que obtiene un pedido por su id
//
//Recibe: idPedido

const Order = require('../models');

const getOrder = async (idPedido) => {
  try {
    const pedido = await Order.findByPk(idPedido);

    // mapea los resultados 
    const pedidoMapped = {
      id_order: pedido.id_order,
      id_product: pedido.id_product, 
      price: pedido.price,
      amount: pedido.amount,
    };

    return { success: true, pedido: pedidoMapped };
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return { success: false, message: 'Error al obtener el pedido', error: error.message };
  }
}
