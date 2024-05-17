const Order = require('./models/order');
const Sequelize = require('sequelize');

//LISTAR TODOS
const getOrders = async () => {
  try {
    const pedidos = await Order.findAll();

    // mapea los resultados 
    const pedidosMapped = pedidos.map(pedido => {
      return {
        id_order: pedido.id_order,
        id_producto: pedido.id_producto,
        price: pedido.price,
        amount: pedido.amount,
      };
    });

    return { success: true, pedidos: pedidosMapped };
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return { success: false, message: 'Error al obtener los pedidos', error: error.message };
  }
};

//LISTAR UNO POR ID
const getOrder = async (idPedido) => {
  try {
    const pedido = await Order.findByPk(idPedido);

    // mapea los resultados 
    const pedidoMapped = {
      id_order: pedido.id_order,
      id_product: pedido.id_product, 
      price: pedido.price,
      amount: pedido.amount,
    };

    return { success: true, pedido: pedidoMapped };
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    return { success: false, message: 'Error al obtener el pedido', error: error.message };
  }
};

//CREAR
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
};

//MODIFICAR
const modifyOrder = async function (id, producto, precio, cantidad) {
  try {
    // Busca el pedido por id
    const pedido = await Order.findOne({
      where: {
        id_order: id
      }
    });
    if (!pedido) {
      return { success: false, message: 'Pedido no encontrado' };
    }
    // Actualiza los campos
    if (producto) {
      pedido.id_product = producto;
    }
    if (precio) {
      pedido.price = precio;
    }
    if (cantidad) {
      pedido.amount = cantidad;
    }
    await pedido.save();
    return { success: true, pedido: pedido };
  }
  catch (error) {
    console.error('Error al actualizar el pedido:', error);
    return { success: false, message: 'Error al actualizar el pedido', error: error.message };
  }
};


//BORRAR
const deleteOrder = async (idPedido) => {
    const pedido = await Order.findByPk(idPedido);
    if (!pedido) {
        throw new Error('No existe el pedido');
    }
    await pedido.destroy();
    return pedido;
};

module.exports = { getOrders, getOrder, createOrder, modifyOrder, deleteOrder};

