const OrderLine = require('./models/orderline');
const Sequelize = require('sequelize');

//LISTAR TODOS
const getOrderLines = async () => {
  try {
    const query = 'SELECT * FROM OrderLines';
    const [results] = await db.execute(query);

    if (results.length > 0) {
      return { success: true, lineasPedido: results };
    }
    else {
      return { success: false, message: 'No se encontraron líneas de pedido en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener las líneas de pedido:', error);
    return { success: false, message: 'Error al obtener las líneas de pedido', error: error.message };
  }
};

//LISTAR UNO POR ID
const getOrderLine = async (idLineaPedido) => {
  try {
    const query = 'SELECT * FROM OrderLines WHERE id = ?';
    const [result] = await db.execute(query, [idLineaPedido]);

    if (result.length > 0) {
      return { success: true, lineaPedido: result[0] };
    }
    else {
      return { success: false, message: 'No se encontró la línea de pedido en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener la linea de pedido:', error);
    return { success: false, message: 'Error al obtener la linea de pedido', error: error.message };
  }
};

//CREAR
const createOrderLine = async function (idCliente, idBarbero, fecha_pedido) {
  try {
    const query = 'INSERT INTO OrderLines (id_client, id_barber, date_order) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [idCliente, idBarbero, fecha_pedido]);

    return { success: true, message: 'Línea de pedido creada con éxito', serviceId: result.insertId };
  } catch (error) {
    console.error('Error al agregar la línea de pedido:', error);
    return { success: false, message: 'Error al agregar la línea de pedido', error: error.message };
  }
};

//MODIFICAR
const modifyOrderLine = async function (id, idCliente, idBarbero, fecha_pedido) {
  try {
    const query = 'UPDATE OrderLines SET id_client = ?, id_barber = ?, date_order = ? WHERE id = ?';
    const [result] = await db.execute(query, [idCliente, idBarbero, fecha_pedido, id]);

    return { success: true, message: 'Línea de pedido modificada con éxito', serviceId: result.insertId};
  }
  catch (error) {
    console.error('Error al actualizar la linea de pedido:', error);
    return { success: false, message: 'Error al actualizar la linea de pedido', error: error.message };
  }
};


//BORRAR
const deleteOrderLine = async function (id) {
  try{
    const query = 'DELETE FROM OrderLines WHERE id = ?';
    const [result] = await db.execute(query, [id]);

    return { success: true, message: 'Línea de pedido eliminada con éxito'};
  }
  catch(error){
    console.error('Error al eliminar la línea de pedido:', error);
    return { success: false, message: 'Error al eliminar la línea de pedido', error: error.message };
  }
};

module.exports = { getOrderLines, getOrderLine, createOrderLine, modifyOrderLine, deleteOrderLine};

