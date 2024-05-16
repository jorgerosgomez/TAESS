//Función que recibe el id de un pedido y lo elimina de la base de datos
//
//Recibe: idPedido

const Order = require('../models');

const deleteOrder = async (idPedido) => {
    const pedido = await Order.findByPk(idPedido);
    if (!pedido) {
        throw new Error('No existe el pedido');
    }
    await pedido.destroy();
    return pedido;
}
