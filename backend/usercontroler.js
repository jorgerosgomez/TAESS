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

const deleteUser = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return { success: false, message: 'Usuario no encontrado' };
    }
    return { success: true, message: 'Usuario eliminado con éxito' };
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return { success: false, message: 'Error al eliminar el usuario' };
  }
};

const modifyUser = async (id, fullName, username, email, telephone) => {
  try {
    const query = 'UPDATE users SET fullName = ?, username = ?, email = ?, telephone = ? WHERE id = ?';
    const [result] = await db.execute(query, [fullName, username, email, telephone, id]);
    if (result.affectedRows === 0) {
      return { success: false, message: 'Usuario no encontrado' };
    }
    return { success: true, message: 'Usuario actualizado con éxito' };
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return { success: false, message: 'Error al actualizar el usuario' };
  }
};

module.exports = { createUser, getUsers, deleteUser, modifyUser };
