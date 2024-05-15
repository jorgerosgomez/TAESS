const db = require('./database');


//LISTAR TODOS
const getServices = async () => {
    try {
      const query = 'SELECT * FROM Services';
      const [results] = await db.execute(query);
  
      if (results.length > 0) {
        return { success: true, services: results };
      } else {
        return { success: false, message: 'No se encontraron servicios en la base de datos' };
      }
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
      return { success: false, message: 'Error al obtener los servicios' };
    }
  };


//CREAR
const createService = async (name, description, duration, price) => {
    try {
      const query = 'INSERT INTO Services ( name, description, duration, price ) VALUES (?, ?, ?, ?)';
      const [result] = await db.execute(query, [name, description, duration, price]);
  
      return { success: true, message: 'Servicio registrado con exito', serviceId: result.insertId };
    } catch (error) {
      console.error('Error al registrar el servicio:', error);
      return { success: false, message: 'Error al registrar el servicio' };
    }
};


//MODIFICAR
const modifyService = async (name, description, duration, price, serviceId) => {
    try {
      const query = 'UPDATE Services SET name = ?, description = ?, duration = ?, price = ? WHERE id = ?';
      const [result] = await db.execute(query, [name, description, duration, price, serviceId]);
  
      return { success: true, message: 'Servicio modificado con exito', serviceId: result.insertId };
    } catch (error) {
      console.error('Error al modificar el servicio:', error);
      return { success: false, message: 'Error al modificar el servicio' };
    }
};


//BORRAR
const deleteService = async (id) => {
  try {
    await db.execute('DELETE FROM Services WHERE id = ?', [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, message: 'Error deleting service' };
  }
};

module.exports = { getServices, createService, modifyService, deleteService };

