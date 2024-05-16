//Función que recibe los campos de un nuevo pedido y los agrega a la base de datos
//
//Recibe: producto, precio, cantidad, idLineaPedido.

const Order = require('../models');

const createOrder = async function (producto, precio, cantidad) {
  try {
    // Crea el nuevo pedido
    const pedido = await Pedido.create({
      id_product: producto,
      price: precio,
      amount: cantidad,
    });

    return { success: true, pedido: pedido };
  } catch (error) {
    console.error('Error al agregar el pedido:', error);
    return { success: false, message: 'Error al agregar el pedido', error: error.message };
  }
}
