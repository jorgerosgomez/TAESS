//Función que recibe el id de un cliente y lo elimina de la base de datos
//
//Recibe: id

const Cliente = require('../models');

module.exports = async function deleteCliente(id) {
  try{
    const cliente = await Cliente.findByPk(id);

    if(!cliente){
      return { success: false, message: 'No se encontró el cliente' };
    }

    await cliente.destroy();

    return { success: true };
  }
  catch(error){
    console.error('Error al eliminar el cliente:', error);
    return { success: false, message: 'Error al eliminar el cliente', error: error.message };
  }
}
