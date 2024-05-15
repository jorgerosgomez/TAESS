const Reserva = require('../models');

//Función que recibe los campos de una nueva reserva y la agrega a la base de datos
//
//Recibe: idCliente, idBarbero, fecha y servicio

const createReserva = async function (idCliente, idBarbero, fecha, servicio) {
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

//función que recibe el ide de una reserva y la elimina de la base de datos
//
//Recibe: id

const deleteReserva = async function (id) {
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

//Función que obtiene una reserva por su id
//
//Recibe: idReserva

const getReserva = async function (idReserva) => {
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

//Función que extrae todas las reservas de la base de datos y las devuelve en un objeto JSON

const getReservas = async () => {
  try {
    const reservas = await Reserva.findAll();

    // mapea los resultados 
    const reservasMapped = reservas.map(reserva => {
      return {
        id: reserva.id,
        fechaInicio: reserva.fechaInicio,
        fechaFin: reserva.fechaFin,
        idUsuario: reserva.idUsuario,
        idProducto: reserva.idProducto
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

const modifyReserva = async function (idReserva, idCliente, idBarbero, fecha, servicio) {
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
