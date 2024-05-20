const Barber = require('./models/barber');
const db = require('./database');

// LISTAR TODOS
const getBarbers = async () => {
  try {
    const query = 'SELECT * FROM Barbers';
    const [results] = await db.execute(query);

    if (results.length > 0) {
      return { success: true, barbers: results };
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
    const query = 'SELECT * FROM Barbers WHERE id_barber = ?';
    const [result] = await db.execute(query, [idBarbero]);

    return { success: true, message:'Barbero leído con éxito', barber: result[0]};
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
