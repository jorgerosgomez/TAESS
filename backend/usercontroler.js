const db = require('./database');
const bcrypt = require('bcryptjs');

const createUser = async (fullName, username, email, password, telephone) => {
  try {
    if (!fullName) throw new Error('El campo fullName es requerido');
    if (!username) throw new Error('El campo username es requerido');
    if (!email) throw new Error('El campo email es requerido');
    if (!password) throw new Error('El campo password es requerido');
    if (!telephone) throw new Error('El campo telephone es requerido');

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (fullName, username, email, password, telephone) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [fullName, username, email, hashedPassword, telephone]);

    return { success: true, message: 'Usuario registrado con éxito', userId: result.insertId };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);

   
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message.includes('username')) {
        return { success: false, message: 'DuplicateUsername' };
      }
      if (error.message.includes('email')) {
        return { success: false, message: 'DuplicateEmail' };
      }
    }

    return { success: false, message: error.message };
  }
};


const modifyUser = async (id, fullName, username, email, telephone) => {
  try {
    if (!id) throw new Error('El campo id es requerido');
    if (!fullName) throw new Error('El campo fullName es requerido');
    if (!username) throw new Error('El campo username es requerido');
    if (!email) throw new Error('El campo email es requerido');
    if (!telephone) throw new Error('El campo telephone es requerido');

    const query = 'UPDATE users SET fullName = ?, username = ?, email = ?, telephone = ? WHERE id = ?';
    const [result] = await db.execute(query, [fullName, username, email, telephone, id]);
    if (result.affectedRows === 0) {
      return { success: false, message: 'Usuario no encontrado' };
    }
    return { success: true, message: 'Usuario actualizado con éxito' };
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);

    // Detectar error de entrada duplicada
    if (error.message.includes('Duplicate entry')) {
      if (error.message.includes('for key \'username\'')) {
        return { success: false, message: 'DuplicateUsername' };
      }
      if (error.message.includes('for key \'email\'')) {
        return { success: false, message: 'DuplicateEmail' };
      }
    }

    return { success: false, message: error.message };
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




module.exports = { createUser, getUsers, deleteUser, modifyUser };
