//Función que recibe los campos de una nueva reserva y la agrega a la base de datos
//
//Recibe: idCliente, idBarbero, fecha y servicio

const Reserva = require('../models');

module.exports = async function addReserva(idCliente, idBarbero, fecha, servicio) {
  try {
    // Crea la nueva reserva
    const reserva = await Reserva.create({
      idCliente: idCliente,
      idBarbero: idBarbero,
      fecha: fecha,
      servicio: servicio,
    });

    return { success: true, reserva: reserva };
  } catch (error) {
    console.error('Error al agregar la reserva:', error);
    return { success: false, message: 'Error al agregar la reserva', error: error.message };
  }
}
