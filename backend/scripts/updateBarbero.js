//Función que recibe un id y unos parámetros correspondientes a los campos del modelo Barbero, para actualizar un registro en la base de datos.
//
//Recibe un id y nombre, contraseña, email, telefono, horario, administrador?, disponible?; correspondientes a los campos del modelo Barbero, para actualizar un registro en la base de datos.

const Barbero = require('../../models');
const { Op } = require("sequelize");

module.exports = async function updateBarbero(id, nombre, contraseña, email, telefono, horario, administrador, disponible) {
  try {
    // Busca el barbero por id
    const barbero = await Barbero.findOne({
      where: {
        id: id
      }
    });

    if (!barbero) {
      return { success: false, message: 'Barbero no encontrado' };
    }

    // Actualiza los campos
    if (nombre) {
      barbero.nombre = nombre;
    }
    if (contraseña) {
      barbero.contraseña = contraseña;
    }
    if (email) {
      barbero.email = email;
    }
    if (telefono) {
      barbero.telefono = telefono;
    }
    if (horario) {
      barbero.horario = horario;
    }
    if (administrador) {
      barbero.administrador = administrador;
    }
    if (disponible) {
      barbero.disponible = disponible;
    }

    await barbero.save();

    return { success: true, barbero: barbero };
  } catch (error) {
    console.error('Error al actualizar el barbero:', error);
    return { success: false, message: 'Error al actualizar el barbero', error: error.message };
  }
}
