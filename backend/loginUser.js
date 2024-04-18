const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (username, password) => {
  try {
    // Consulta la base de datos para obtener el usuario con el nombre de usuario proporcionado
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    
    // Verifica si se encontró un usuario con el nombre de usuario proporcionado
    if (rows.length === 0) {
      return { success: false, message: 'El usuario no existe' };
    }

    const user = rows[0];

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Contraseña incorrecta' };
    }

    // Genera un token de autenticación
    const token = jwt.sign({ userId: user.id }, 'tu_clave_secreta', { expiresIn: '1h' });

    return { success: true, token };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, message: 'Error al iniciar sesión' };
  }
};

module.exports = { loginUser };
