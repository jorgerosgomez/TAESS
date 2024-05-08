//Función que obtiene un servicio por su id
//
//Recibe: idServicio

const {Servicio} = require('../models');

const getServicio = async (idServicio) => {
  try {
    const servicio = await Servicio.findByPk(idServicio);

    // mapea los resultados 
    const servicioMapped = {
      id: servicio.id,
      nombre: servicio.nombre,
      precio: servicio.precio,
    };

    return { success: true, servicio: servicioMapped };
  } catch (error) {
    console.error('Error al obtener el servicio:', error);
    return { success: false, message: 'Error al obtener el servicio', error: error.message };
  }
}
