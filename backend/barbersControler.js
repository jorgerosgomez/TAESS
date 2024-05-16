const Barber = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

//LISTAR TODOS
const getBarebers = async () => {
  try {
    const barberos = await Barber.findAll();

    // mapea los resultados 
    const barberosMapped = barberos.map(barbero => {
      return {
      id: barbero.id_barber,
      name: barbero.name,
      phone: barbero.phone,
      email: barbero.email,
      password: barbero.password,
      admin: barbero.admin,
      available: barbero.available,      };
    });

    return { success: true, barberos: barberosMapped };
  } catch (error) {
    console.error('Error al obtener los barberos:', error);
    return { success: false, message: 'Error al obtener los barberos', error: error.message };
  }
};


//LISTAR UNO POR ID
const getBarber = async (idBarbero) => {
  try {
    const barbero = await Barber.findByPk(idBarbero);

    // mapea los resultados 
    const barberoMapped = {
      id: barbero.id_barber,
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


//CREAR
const createBarber = async function (name, password, email, phone, admin, available) {
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

//MODIFICAR
const modifyBarber = async function (id, name, password, email, phone, admin, available) {
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


//BORRAR
const deleteBarber = async function (id) {
  try{
    const barbero = await Barber.findByPk(id);

    if(!barbero){
      return { success: false, message: 'No se encontró el barbero' };
    }

    await barbero.destroy();

    return { success: true };
  }
  catch(error){
    console.error('Error al eliminar el barbero:', error);
    return { success: false, message: 'Error al eliminar el barbero', error: error.message };
  }
}

module.exports = { getBarbers, getBarber, createBarber, modifyBarber, deleteBarber };

