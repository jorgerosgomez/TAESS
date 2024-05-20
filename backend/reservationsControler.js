const Reservation = require('./models/reservation');
const Sequelize = require('sequelize');
const db = require('./database');

<<<<<<< HEAD

const createReservation = async (idCliente, idBarbero, fecha, servicio, duration, price) => {
  try {
    const query = 'INSERT INTO Reservations (idCliente, idBarbero, fecha, servicio, duration, price) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [idCliente, idBarbero, fecha, servicio, duration, price]);

    return { success: true, message: 'Reserva registrado con éxito', reservationId: result.insertId };
=======
// Función que recibe los campos de una nueva reserva y la agrega a la base de datos
// Recibe: idCliente, idBarbero, fecha y servicio
async function createReservation(idCliente, idBarbero, fecha, servicio, duracion, precio) {
  try {
    const query = 'INSERT INTO Reservations (id_client, id_barber, date_reservation, id_service, duration_total, price_total) VALUES (?, ?, ?, ?, ?, ?)';
    const reserva = await db.execute(query, [idCliente, idBarbero, fecha, servicio, duracion, precio]);

    return { success: true, message: "Reserva registrada con éxito.", reserva: reserva };
>>>>>>> main
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    return { success: false, message: 'Error al registrar el producto' };
  }
};

// Función que recibe el id de una reserva y la elimina de la base de datos
// Recibe: id
async function deleteReservation(id) {
  try {
    const query = 'DELETE FROM Reservations WHERE id = ?';
    await db.execute(query, [id]);


    return { success: true, message: 'Reserva eliminada con éxito'};
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    return { success: false, message: 'Error al eliminar la reserva', error: error.message };
  }
};

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
};

// Función que extrae todas las reservas de la base de datos y las devuelve en un objeto JSON
const getReservations = async () => {
  try {
    const query = 'SELECT * FROM Reservations';
    const [results] = await db.execute(query);

    if (results.length > 0) {
      return { success: true, reservations: results };
    }
    else {
      return { success: false, message: 'No se encontraron reservas en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    return { success: false, message: 'Error al obtener las reservas' };
  }
};

// Función que recibe el id de una reserva y unos parámetros correspondientes a los campos del modelo Reserva, para actualizar un registro en la base de datos.
// Recibe: idReserva, idCliente, idBarbero, fecha, servicio
async function modifyReservation(idReserva, idCliente, idBarbero, fecha, servicio, duracion, precio) {
  try {
    const query = 'UPDATE Reservations SET id_client = ?, id_barber = ?, date_reservation = ?, id_service = ?, duration_total = ?, price_total = ? WHERE id = ?';
    const [result] = await db.execute(query, [idCliente, idBarbero, fecha, servicio, duracion, precio, idReserva]);

    return { success: true, message: 'Reserva actualizada con éxito', reservationId: result.insertId};
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    return { success: false, message: 'Error al actualizar la reserva', error: error.message };
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
  modifyReservation,
};
