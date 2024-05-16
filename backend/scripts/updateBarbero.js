//Función que recibe un id y unos parámetros correspondientes a los campos del modelo Barbero, para actualizar un registro en la base de datos.
//
//Recibe un id y nombre, contraseña, email, telefono, horario, administrador?, disponible?; correspondientes a los campos del modelo Barbero, para actualizar un registro en la base de datos.

const Barber = require('../../models');
const Sequelize = require("sequelize");

const modifyBarbero = async function (id, name, password, email, phone, admin, available) {
  try {
    // Busca el barbero por id
    const barbero = await Barber.findOne({
      where: {
        id_barber: id
      }
    });

    if (!barbero) {
      return { success: false, message: 'Barbero no encontrado' };
    }

    // Actualiza los campos
    if (name) {
      barbero.name = nombre;
    }
    if (password) {
      barbero.password = password;
    }
    if (email) {
      barbero.email = email;
    }
    if (phone) {
      barbero.phone = phone;
    }
    if (admin) {
      barbero.admin = admin;
    }
    if (available) {
      barbero.available = available;
    }

    await barbero.save();

    return { success: true, barbero: barbero };
  } catch (error) {
    console.error('Error al actualizar el barbero:', error);
    return { success: false, message: 'Error al actualizar el barbero', error: error.message };
  }
}
