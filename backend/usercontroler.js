const db = require('./database');
const bcrypt = require('bcryptjs');

const createUser = async (username, email, password) => {
  try {
    // Genera un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [username, email, hashedPassword]);

    return { success: true, message: 'Usuario registrado con éxito', userId: result.insertId };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return { success: false, message: 'Error al registrar el usuario' };
  }
};

module.exports = { createUser };
