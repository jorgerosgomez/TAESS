//Función que obttiene un peluquero por su id
//
//Recibe: idPeluquero

const {Barber} = require('../models');

const getBarbero = async (idBarbero) => {
  try {
    const barbero = await Barber.findByPk(idBarbero);

    // mapea los resultados 
    const barberoMapped = {
      id_barber: barbero.id_barber,
      name: barbero.name,
      phone: barbero.phone,
      email: barbero.email,
      password: barbero.password,
      admin: barbero.admin,
      available: barbero.available,
    };

    return { success: true, peluquero: peluqueroMapped };
  } catch (error) {
    console.error('Error al obtener el peluquero:', error);
    return { success: false, message: 'Error al obtener el peluquero', error: error.message };
  }
}
