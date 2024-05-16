const Barber = require('./models/barber');
const bcrypt = require('bcrypt');

// LISTAR TODOS
const getBarbers = async () => {
  try {
    const barberos = await Barber.findAll();

    // Mapea los resultados 
    const barberosMapped = barberos.map(barbero => {
      return {
        id: barbero.id_barber,
        name: barbero.name,
        phone: barbero.phone,
        email: barbero.email,
        available: barbero.available,
      };
    });

    return { success: true, barberos: barberosMapped };
  } catch (error) {
    console.error('Error al obtener los barberos:', error);
    return { success: false, message: 'Error al obtener los barberos', error: error.message };
  }
};

// LISTAR UNO POR ID
const getBarber = async (idBarbero) => {
  try {
    const barbero = await Barber.findByPk(idBarbero);

    if (!barbero) {
      return { success: false, message: 'Barbero no encontrado' };
    }

    // Mapea los resultados 
    const barberoMapped = {
      id: barbero.id_barber,
      name: barbero.name,
      phone: barbero.phone,
      email: barbero.email,
      available: barbero.available,
    };

    return { success: true, barbero: barberoMapped };
  } catch (error) {
    console.error('Error al obtener el barbero:', error);
    return { success: false, message: 'Error al obtener el barbero', error: error.message };
  }
};

// CREAR
const createBarber = async (name, password, email, phone, admin, available) => {
  try {
    // Crea el nuevo barbero
    const barbero = await Barber.create({
      name: name,
      email: email,
      phone: phone,
      available: available,
    });

    return { success: true, barbero: barbero };
  } catch (error) {
    console.error('Error al agregar el barbero:', error);
    return { success: false, message: 'Error al agregar el barbero', error: error.message };
  }
};

// MODIFICAR
const modifyBarber = async (id, name, password, email, phone, admin, available) => {
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
      barbero.name = name;
    }
    if (email) {
      barbero.email = email;
    }
    if (phone) {
      barbero.phone = phone;
    }
    if (available !== undefined) {
      barbero.available = available;
    }

    await barbero.save();

    return { success: true, barbero: barbero };
  } catch (error) {
    console.error('Error al actualizar el barbero:', error);
    return { success: false, message: 'Error al actualizar el barbero', error: error.message };
  }
};

// BORRAR
const deleteBarber = async (id) => {
  try {
    const barbero = await Barber.findByPk(id);

    if (!barbero) {
      return { success: false, message: 'No se encontró el barbero' };
    }

    await barbero.destroy();

    return { success: true };
  } catch (error) {
    console.error('Error al eliminar el barbero:', error);
    return { success: false, message: 'Error al eliminar el barbero', error: error.message };
  }
};

module.exports = { getBarbers, getBarber, createBarber, modifyBarber, deleteBarber };
