//función que recibe el ide de una reserva y la elimina de la base de datos
//
//Recibe: id

const Reserva = require('../models');

module.exports = async function deleteReserva(id) {
  try{
    const reserva = await Reserva.findByPk(id);

    if(!reserva){
      return { success: false, message: 'No se encontró la reserva' };
    }

    await reserva.destroy();

    return { success: true };
  }
  catch(error){
    console.error('Error al eliminar la reserva:', error);
    return { success: false, message: 'Error al eliminar la reserva', error: error.message };
  }
}
