//Función que obttiene un peluquero por su id
//
//Recibe: idPeluquero

Const {Peluquero} = require('../models');

const getPeluquero = async (idPeluquero) => {
  try {
    const peluquero = await Peluquero.findByPk(idPeluquero);

    // mapea los resultados 
    const peluqueroMapped = {
      id: peluquero.id,
      nombre: peluquero.nombre,
      telefono: peluquero.telefono,
      email: peluquero.email,
    };

    return { success: true, peluquero: peluqueroMapped };
  } catch (error) {
    console.error('Error al obtener el peluquero:', error);
    return { success: false, message: 'Error al obtener el peluquero', error: error.message };
  }
}
