//Función que recibe los campos de un nuevo pedido y los agrega a la base de datos
//
//Recibe: producto, precio, cantidad, idLineaPedido.

const Pedido = require('../models');

module.exports = async function addPedido(producto, precio, cantidad, idLineaPedido) {
  try {
    // Crea el nuevo pedido
    const pedido = await Pedido.create({
      producto: producto,
      precio: precio,
      cantidad: cantidad,
      idLineaPedido: idLineaPedido,
    });

    return { success: true, pedido: pedido };
  } catch (error) {
    console.error('Error al agregar el pedido:', error);
    return { success: false, message: 'Error al agregar el pedido', error: error.message };
  }
}
