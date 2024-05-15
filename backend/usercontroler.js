const db = require('./database');
const bcrypt = require('bcryptjs');

const createUser = async (fullName, username, email, password, telephone) => {
  try {
    // Genera un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (fullName, username, email, password, telephone) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [fullName, username, email, password, telephone]);

    return { success: true, message: 'Usuario registrado con éxito', userId: result.insertId };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return { success: false, message: 'Error al registrar el usuario' };
  }
};
const getUsers = async () => {
  try {
    const query = 'SELECT id, username, email, fullname, telephone FROM users';
    const [users] = await db.execute(query);

    return { success: true, users };
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return { success: false, message: 'Error al obtener los usuarios' };
  }
};


module.exports = { createUser, getUsers};
