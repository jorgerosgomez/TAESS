const Reservation = require('./models/reservation');
const Sequelize = require('sequelize');
const db = require('./database');

// Función que recibe los campos de una nueva reserva y la agrega a la base de datos
// Recibe: idCliente, idBarbero, fecha y servicio
async function createReservation(idCliente, idBarbero, fecha, servicio) {
  try {
    // Crea la nueva reserva
    const reserva = await Reservation.create({
      id_client: idCliente,
      id_barber: idBarbero,
      date_reservation: fecha,
      id_service: servicio,
    });

    return { success: true, reserva: reserva };
  } catch (error) {
    console.error('Error al agregar la reserva:', error);
    return { success: false, message: 'Error al agregar la reserva', error: error.message };
  }
}

// Función que recibe el id de una reserva y la elimina de la base de datos
// Recibe: id
async function deleteReservation(id) {
  try {
    const reserva = await Reservation.findByPk(id);

    if (!reserva) {
      return { success: false, message: 'No se encontró la reserva' };
    }

    await reserva.destroy();

    return { success: true };
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    return { success: false, message: 'Error al eliminar la reserva', error: error.message };
  }
}

// Función que obtiene una reserva por su id
// Recibe: idReserva
async function getReservation(idReserva) {
  try {
    const query = 'SELECT * FROM Reservations WHERE id = ?';
    const [result] = await db.execute(query, [idReserva]);

    if (result.length > 0) {
      return { success: true, reserva: result[0] };
    }
    else {
      return { success: false, message: 'No se encontró la reserva en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    return { success: false, message: 'Error al obtener la reserva', error: error.message };
  }
}

// Función que extrae todas las reservas de la base de datos y las devuelve en un objeto JSON
async function getReservations() {
  try {
    const query = 'SELECT * FROM Reservations';
    const [result] = await db.execute(query);

    if (result.length > 0) {
      return { success: true, reservas: result };
    }
    else {
      return { success: false, message: 'No se encontraron reservas en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    return { success: false, message: 'Error al obtener las reservas', error: error.message };
  }
}

// Función que recibe el id de una reserva y unos parámetros correspondientes a los campos del modelo Reserva, para actualizar un registro en la base de datos.
// Recibe: idReserva, idCliente, idBarbero, fecha, servicio
async function modifyReservation(idReserva, idCliente, idBarbero, fecha, servicio) {
  try {
    // Busca la reserva por id
    const reserva = await Reservation.findOne({
      where: {
        id: idReserva,
      },
    });

    if (!reserva) {
      return { success: false, message: 'Reserva no encontrada' };
    }

    // Actualiza los campos
    if (idCliente) {
      reserva.id_client = idCliente;
    }
    if (idBarbero) {
      reserva.id_barber = idBarbero;
    }
    if (fecha) {
      reserva.date_reservation = fecha;
    }
    if (servicio) {
      reserva.id_service = servicio;
    }

    await reserva.save();

    return { success: true, reserva: reserva };
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    return { success: false, message: 'Error al actualizar la reserva', error: error.message };
  }
}

module.exports = {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
  modifyReservation,
};
