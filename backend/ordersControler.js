const Order = require('./models/order');
const db = require('./database');
const { getProducts } = require('./productcontroler')

//LISTAR TODOS
const getOrders = async () => {
  try {
    const query = 'SELECT * FROM Orders';
    const [results] = await db.execute(query);

    if (results.length > 0) {
      return { success: true, orders: results };
    } else {
      return { success: false, message: 'No se encontraron pedidos en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return { success: false, message: 'Error al obtener los pedidos' };
  }
};

//LISTAR UNO POR ID
const getOrder = async (idPedido) => {
  try {
    const query = 'SELECT * FROM Orders WHERE id_order = ?';
    const [result] = await db.execute(query, [idPedido]);

    return { success: true, pedido: result[0] };
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return { success: false, message: 'Error al obtener el pedido', error: error.message };
  }
};

//CREAR
const createOrder = async (producto, precio, cantidad) => {
  try {
    // Obtener los productos disponibles
    const respuesta = await getProducts();
    if(!respuesta.success){
      return { success: false, message: 'Error al obtener productos: ' + respuesta.message };
    }
    const productIds = respuesta.products.map(product => product.id);

    // Verificar si el ID del producto existe
    if (!productIds.includes(Number(producto))) {
      return { success: false, message: 'ID de producto no válido' };
    }

    const query = 'INSERT INTO Orders ( id_product, price, amount ) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [producto, precio, cantidad]);

    return { success: true, message: 'Pedido registrado con exito', orderId: result.orderId };
  } catch (error) {
    console.error('Error al registrar el pedido:', error);
    return { success: false, message: 'Error al registrar el pedido' };
  }
};

//MODIFICAR
const modifyOrder = async (id, producto, precio, cantidad) => {
  try {
    // Obtener los productos disponibles
    const respuesta = await getProducts();
    if(!respuesta.success){
      return { success: false, message: 'Error al obtener productos: ' + respuesta.message };
    }
    const productIds = respuesta.products.map(product => product.id);

    // Verificar si el ID del producto existe
    if (!productIds.includes(Number(producto))) {
      return { success: false, message: 'ID de producto no valido' };
    }

    const query = 'UPDATE Orders SET id_product = ?, price = ?, amount = ? WHERE id = ?';
    const [result] = await db.execute(query, [producto, precio, cantidad, id]);

    return { success: true, message: 'Pedido modificado con exito', orderId: result.orderId };
  } catch (error) {
    console.error('Error al modificar el pedido:', error);
    return { success: false, message: 'Error al modificar el pedido' };
  }
};


//BORRAR
const deleteOrder = async (idPedido) => {
  try {
    await db.execute('DELETE FROM Orders WHERE id = ?', [idPedido]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, message: 'Error deleting order' };
  }
};

module.exports = { getOrders, getOrder, createOrder, modifyOrder, deleteOrder};

