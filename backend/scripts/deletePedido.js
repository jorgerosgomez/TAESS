//Función que recibe el id de un pedido y lo elimina de la base de datos
//
//Recibe: idPedido

Const { Pedido } = require('../models');

module.exports = async (idPedido) => {
    const pedido = await Pedido.findByPk(idPedido);
    if (!pedido) {
        throw new Error('No existe el pedido');
    }
    await pedido.destroy();
    return pedido;
}
