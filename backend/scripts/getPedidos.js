//Función que extrae los pedidos de la base de datos y los devielve en un objeto JSON

const Order = require('models/order');

const getOrders = async () => {
  try {
    const pedidos = await Order.findAll();

    // mapea los resultados 
    const pedidosMapped = pedidos.map(pedido => {
      return {
        id_order: pedido.id_order,
        id_producto: pedido.id_producto,
        price: pedido.price,
        amount: pedido.amount,
      };
    });

    return { success: true, pedidos: pedidosMapped };
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return { success: false, message: 'Error al obtener los pedidos', error: error.message };
  }
}
