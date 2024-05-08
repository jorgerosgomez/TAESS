//Función que extrae los servicios de la base de datos y los devuelve en objeto JSON

const {Servicio} = require('../models');

const getServicios = async () => {
  try {
    const servicios = await Servicio.findAll();

    // mapea los resultados 
    const serviciosMapped = servicios.map(servicio => {
      return {
        id: servicio.id,
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        precio: servicio.precio
      };
    });

    return { success: true, servicios: serviciosMapped };
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    return { success: false, message: 'Error al obtener los servicios', error: error.message };
  }
}
