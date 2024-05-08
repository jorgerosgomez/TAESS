//Función que extrae todas las reservas de la base de datos y las devuelve en un objeto JSON

const {Reserva} = require('../models');

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
