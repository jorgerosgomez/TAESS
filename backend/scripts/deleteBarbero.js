//Función que recibe el id de un barbero y lo elimina de la base de datos
//
//Recibe: id

const Barbero = require('../models');

module.exports = async function deleteBarbero(id) {
  try{
    const barbero = await Barbero.findByPk(id);

    if(!barbero){
      return { success: false, message: 'No se encontró el barbero' };
    }

    await barbero.destroy();

    return { success: true };
  }
  catch(error){
    console.error('Error al eliminar el barbero:', error);
    return { success: false, message: 'Error al eliminar el barbero', error: error.message };
  }
}
