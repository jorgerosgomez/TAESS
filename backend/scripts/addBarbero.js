//Función que recibe los campos de un nuevo barbero y los agrega a la base de datos
//
//Recibe: nombre, contraseña, email, telefono, horario, administrador?, disponible?

const Barber = require('../models');
const bcrypt = require('bcrypt');

const createBarbero = async function (name, password, email, phone, admin, available) {
  try {
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo barbero
    const barbero = await Barber.create({
      name: name,
      password: hashedPassword,
      email: email,
      phone: phone,
      available: available,
      admin: admin,
    });

    return { success: true, barbero: barbero };
  } catch (error) {
    console.error('Error al agregar el barbero:', error);
    return { success: false, message: 'Error al agregar el barbero', error: error.message };
  }
}
