//Función que recibe los campos de un nuevo barbero y los agrega a la base de datos
//
//Recibe: nombre, contraseña, email, telefono, horario, administrador?, disponible?

const Barbero = require('../models');
const bcrypt = require('bcrypt');

module.exports = async function addBarbero(nombre, contraseña, email, telefono, horario, administrador, disponible) {
  try {
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crea el nuevo barbero
    const barbero = await Barbero.create({
      nombre: nombre,
      contraseña: hashedPassword,
      email: email,
      telefono: telefono,
      horario: horario,
      administrador: administrador,
      disponible: disponible,
    });

    return { success: true, barbero: barbero };
  } catch (error) {
    console.error('Error al agregar el barbero:', error);
    return { success: false, message: 'Error al agregar el barbero', error: error.message };
  }
}
