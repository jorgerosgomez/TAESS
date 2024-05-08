//Función que extrae todas las líneas de pedido de la base de datos y las devuelve en un objeto JSON

const {LineaPedido} = require('../models');

const getLineaPedidos = async () => {
  try {
    const lineaPedidos = await LineaPedido.findAll();

    // mapea los resultados 
    const lineaPedidosMapped = lineaPedidos.map(lineaPedido => {
      return {
        id: lineaPedido.id,
        cantidad: lineaPedido.cantidad,
        precio: lineaPedido.precio,
        productoId: lineaPedido.productoId,
        pedidoId: lineaPedido.pedidoId,
      };
    });

    return { success: true, lineaPedidos: lineaPedidosMapped };
  } catch (error) {
    console.error('Error al obtener las líneas de pedido:', error);
    return { success: false, message: 'Error al obtener las líneas de pedido', error: error.message };
  }
}
