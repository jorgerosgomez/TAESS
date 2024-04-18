const {Barber} = require('../models'); 
const Sequelize = require('sequelize');

const getBareberos = async () => {
  try {
    const barberos = await Barber.findAll();

    // mapea los resultados 
    const barberosMapped = barberos.map(barbero => {
      return {
        id: barbero.id,
        nombre: barbero.nombre,
        telefono: barbero.telefono,
        email: barbero.email,
      };
    });

    return { success: true, barberos: barberosMapped };
  } catch (error) {
    console.error('Error al obtener los barberos:', error);
    return { success: false, message: 'Error al obtener los barberos', error: error.message };
  }
};

module.exports = {getBarberos};
