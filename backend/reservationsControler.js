const Reservation = require('models/reservation');
const Sequelize = require('sequelize');

//Función que recibe los campos de una nueva reserva y la agrega a la base de datos
//
//Recibe: idCliente, idBarbero, fecha y servicio

const createReservation = async function (idCliente, idBarbero, fecha, servicio) {
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

//función que recibe el ide de una reserva y la elimina de la base de datos
//
//Recibe: id

const deleteReservation = async function (id) {
  try{
    const reserva = await Reservation.findByPk(id);

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

//Función que obtiene una reserva por su id
//
//Recibe: idReserva

const getReservation = async function (idReserva) => {
  try {
    const reserva = await Reservation.findByPk(idReserva);

    // mapea los resultados 
    const reservaMapped = {
      id_client: reserva.id_client,
      date_reservation: reserva.date_reservation,
      id_barber: reserva.id_barber,
      id_service: reserva.id_service
    };

    return { success: true, reserva: reservaMapped };
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    return { success: false, message: 'Error al obtener la reserva', error: error.message };
  }
}

//Función que extrae todas las reservas de la base de datos y las devuelve en un objeto JSON

const getReservations = async () => {
  try {
    const reservas = await Reservation.findAll();

    // mapea los resultados 
    const reservasMapped = reservas.map(reserva => {
      return {
        id_client: reserva.id_client,
        date_reservation: reserva.date_reservation,
        id_barber: reserva.id_barber,
        id_service: reserva.id_service
      };
    });

    return { success: true, reservas: reservasMapped };
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    return { success: false, message: 'Error al obtener las reservas', error: error.message };
  }
}

//Función que recibe el id de una reserva y unos parámetros correspondientes a los campos del modelo Reserva, para actualizar un registro en la base de datos.
//
//Recibe: idReserva, idCliente, idBarbero, fecha, servicio

const modifyReservation = async function (idReserva, idCliente, idBarbero, fecha, servicio) {
  try {
    // Busca la reserva por id
    const reserva = await Reservation.findOne({
      where: {
        id: idReserva
      }
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

moodule.exports = { createReserva, deleteReserva, getReserva, getReservas, modifyReserva };
