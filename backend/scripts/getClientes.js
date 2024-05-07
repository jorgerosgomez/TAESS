//Función que extrae todos los clientes de la base de datos y los devuelve en un objeto JSON

const {Client} = require('../models');

const getClientes = async () => {
  try {
    const clientes = await Client.findAll();

    // mapea los resultados 
    const clientesMapped = clientes.map(cliente => {
      return {
        id: cliente.id,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        email: cliente.email,
      };
    });

    return { success: true, clientes: clientesMapped };
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    return { success: false, message: 'Error al obtener los clientes', error: error.message };
  }
}
