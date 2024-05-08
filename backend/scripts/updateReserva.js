//Función que recibe el id de una reserva y unos parámetros correspondientes a los campos del modelo Reserva, para actualizar un registro en la base de datos.
//
//Recibe: idReserva, idCliente, idBarbero, fecha, servicio

const Reserva = require('../../models');

module.exports = async function updateReserva(idReserva, idCliente, idBarbero, fecha, servicio) {
  try {
    // Busca la reserva por id
    const reserva = await Reserva.findOne({
      where: {
        id: idReserva
      }
    });

    if (!reserva) {
      return { success: false, message: 'Reserva no encontrada' };
    }

    // Actualiza los campos
    if (idCliente) {
      reserva.idCliente = idCliente;
    }
    if (idBarbero) {
      reserva.idBarbero = idBarbero;
    }
    if (fecha) {
      reserva.fecha = fecha;
    }
    if (servicio) {
      reserva.servicio = servicio;
    }

    await reserva.save();

    return { success: true, reserva: reserva };
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    return { success: false, message: 'Error al actualizar la reserva', error: error.message };
  }
}
