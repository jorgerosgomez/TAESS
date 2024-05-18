const Barber = require('./models/barber');
const db = require('./database');

// LISTAR TODOS
const getBarbers = async () => {
  try {
    const query = 'SELECT * FROM Barbers';
    const [results] = await db.execute(query);

    if (results.length > 0) {
      return { success: true, services: results };
    } else {
      return { success: false, message: 'No se encontraron barberos en la base de datos' };
    }
  } catch (error) {
    console.error('Error al obtener los barberos:', error);
    return { success: false, message: 'Error al obtener los barberos' };
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
const createBarber = async (name, email, phone, available) => {
  try {
    const query = 'INSERT INTO Barbers ( name, email, phone, available ) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, email, phone, available]);

    return { success: true, message: 'Barbero registrado con exito', barberId: result.insertId };
  } catch (error) {
    console.error('Error al registrar el barbero:', error);
    return { success: false, message: 'Error al registrar el barbero' };
  }
};

// MODIFICAR
const modifyBarber = async (name, email, phone, available, barberId) => {
  try {
    const query = 'UPDATE Barbers SET name = ?, email = ?, phone = ?, available = ? WHERE id = ?';
    const [result] = await db.execute(query, [name, email, phone, available, barberId]);

    return { success: true, message: 'Barbero modificado con exito', barberId: result.insertId };
  } catch (error) {
    console.error('Error al modificar el barbero:', error);
    return { success: false, message: 'Error al modificar el barbero' };
  }
};

// BORRAR
const deleteBarber = async (id) => {
  try {
    await db.execute('DELETE FROM Barbers WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting barber:', error);
    return { success: false, message: 'Error deleting barber' };
  }
};

module.exports = { getBarbers, getBarber, createBarber, modifyBarber, deleteBarber };
