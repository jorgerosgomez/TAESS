//Función que recibe un id y unos parámetros correspondientes a los campos del modelo Cliente, para actualizar un registro en la base de datos.
//
//Recibe: id, usuario, nombre, contraseña, email y telefono.

const Cliente = require('../../models');
const { Op } = require("sequelize");

module.exports = async function updateCliente(id, usuario, nombre, contraseña, email, telefono) {
  try {
    // Busca el cliente por id
    const cliente = await Cliente.findOne({
      where: {
        id: id
      }
    });
    if (!cliente) {
      return { success: false, message: 'Cliente no encontrado' };
    }
    // Actualiza los campos
    if (usuario) {
      cliente.usuario = usuario;
    }
    if (nombre) {
      cliente.nombre = nombre;
    }
    if (contraseña) {
      cliente.contraseña = contraseña;
    }
    if (email) {
      cliente.email = email;
    }
    if (telefono) {
      cliente.telefono = telefono;
    }
    await cliente.save();
    return { success: true, cliente: cliente };
  }
  catch (error) {
    console.error('Error al actualizar el cliente:', error);
    return { success: false, message: 'Error al actualizar el cliente', error: error.message };
  }
}
