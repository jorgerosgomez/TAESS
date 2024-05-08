//Función que recibe los campos de un nuevo cliente y los agrega a la base de datos
//
//Recibe: usuario, nombre, contraseña, email, telefono

const Cliente = require('../models');
const bcrypt = require('bcrypt');

module.exports = async function addCliente(usuario, nombre, contraseña, email, telefono) {
  try {
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crea el nuevo cliente
    const cliente = await Cliente.create({
      usuario: usuario,
      nombre: nombre,
      contraseña: hashedPassword,
      email: email,
      telefono: telefono,
    });

    return { success: true, cliente: cliente };
  } catch (error) {
    console.error('Error al agregar el cliente:', error);
    return { success: false, message: 'Error al agregar el cliente', error: error.message };
  }
}
