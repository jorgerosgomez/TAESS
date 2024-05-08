//Función que obtiene una reserva por su id
//
//Recibe: idReserva

const {Reserva} = require('../models');

const getReserva = async (idReserva) => {
  try {
    const reserva = await Reserva.findByPk(idReserva);

    // mapea los resultados 
    const reservaMapped = {
      id: reserva.id,
      fechaInicio: reserva.fechaInicio,
      fechaFin: reserva.fechaFin,
      idHabitacion: reserva.idHabitacion,
      idCliente: reserva.idCliente,
    };

    return { success: true, reserva: reservaMapped };
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    return { success: false, message: 'Error al obtener la reserva', error: error.message };
  }
}
