//Función que elimina una línea de pedido de la base de datos
//
//Recibe: id

const OrderLine= require('../models');

const deleteOrderLine = async function (id) {
  try{
    const lineaPedido = await OrderLine.findByPk(id);

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
