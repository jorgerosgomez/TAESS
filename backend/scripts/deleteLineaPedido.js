//Función que elimina una línea de pedido de la base de datos
//
//Recibe: id

Const LineaPedido = require('../models');

module.exports = async function deleteLineaPedido(id) {
  try{
    const lineaPedido = await LineaPedido.findByPk(id);

    if(!lineaPedido){
      return { success: false, message: 'No se encontró la línea de pedido' };
    }

    await lineaPedido.destroy();

    return { success: true };
  }
  catch(error){
    console.error('Error al eliminar la línea de pedido:', error);
    return { success: false, message: 'Error al eliminar la línea de pedido', error: error.message };
  }
}
