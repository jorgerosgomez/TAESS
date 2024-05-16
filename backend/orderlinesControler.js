const OrderLine = require('models/orderline');
const Sequelize = require('sequelize');

//LISTAR TODOS
const getOrderLines = async () => {
  try {
    const lineaPedidos = await OrderLine.findAll();

    // mapea los resultados 
    const lineaPedidosMapped = lineaPedidos.map(lineaPedido => {
      return {
        id_client: lineaPedido.id_client,
        id_barber: lineaPedido.id_barber,
        date_order: lineaPedido.date_order,
      };
    });

    return { success: true, lineaPedidos: lineaPedidosMapped };
  } catch (error) {
    console.error('Error al obtener las líneas de pedido:', error);
    return { success: false, message: 'Error al obtener las líneas de pedido', error: error.message };
  }
}

//LISTAR UNO POR ID
const getOrderLine = async (idLineaPedido) => {
  try {
    const lineaPedido = await OrderLine.findByPk(idLineaPedido);

    // mapea los resultados 
    const lineaPedidoMapped = {
      id: lineaPedido.id,
      id_client: lineaPedido.id_client,
      id_barber: lineaPedido.id_barber,
      date_order: lineaPedido.date_order,
    };

    return { success: true, lineaPedido: lineaPedidoMapped };
  } catch (error) {
    console.error('Error al obtener la linea de pedido:', error);
    return { success: false, message: 'Error al obtener la linea de pedido', error: error.message };
  }
}

//CREAR
const createOrderLine = async function (idCliente, idBarbero, fecha_pedido) {
  try {
    // Crea la nueva línea de pedido
    const lineaPedido = await OrderLine.create({
      id_client: idCliente,
      id_barber: idBarbero,
      date_order: fecha_pedido,
    });

    return { success: true, lineaPedido: lineaPedido };
  } catch (error) {
    console.error('Error al agregar la línea de pedido:', error);
    return { success: false, message: 'Error al agregar la línea de pedido', error: error.message };
  }
}

//MODIFICAR
const modifyOrderLine = async function (id, idCliente, idBarbero, fecha_pedido) {
  try {
    // Busca la linea de pedido por id
    const lineaPedido = await OrderLine.findOne({
      where: {
        id: id
      }
    });
    if (!lineaPedido) {
      return { success: false, message: 'Linea de pedido no encontrada' };
    }
    // Actualiza los campos
    if (idCliente) {
      lineaPedido.id_client = idCliente;
    }
    if (idBarbero) {
      lineaPedido.id_barber = idBarbero;
    }
    if (fecha_pedido) {
      lineaPedido.date_order = fecha_pedido;
    }
    await lineaPedido.save();
    return { success: true, lineaPedido: lineaPedido };
  }
  catch (error) {
    console.error('Error al actualizar la linea de pedido:', error);
    return { success: false, message: 'Error al actualizar la linea de pedido', error: error.message };
  }
}


//BORRAR
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

module.exports = { getOrderLines, getOrderLine, createOrderLine, modifyOrderLine, deleteOrderLine};

