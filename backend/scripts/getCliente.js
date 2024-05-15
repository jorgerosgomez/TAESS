//Función que recibe el id de un cliente y devuelve la información de este
//
//Recibe: idCliente

Const {Cliente} = require('../models');
const getCliente = async (idCliente) => {
  try {
    const cliente = await Cliente.findByPk(idCliente);

    // mapea los resultados 
    const clienteMapped = {
      id: cliente.id,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      email: cliente.email,
    };

    return { success: true, cliente: clienteMapped };
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    return { success: false, message: 'Error al obtener el cliente', error: error.message };
  }
}
