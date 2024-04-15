const db = require('./database');
const bcrypt = require('bcryptjs');


//LISTAR TODOS
const getServices = async () => {
    try {
      const query = 'SELECT * FROM services';
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
      const query = 'INSERT INTO services ( name, description, duration, price ) VALUES (?, ?, ?, ?)';
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
      const query = 'UPDATE services SET name = ?, description = ?, duration = ?, price = ? WHERE id = ?';
      const [result] = await db.execute(query, [name, description, duration, price, serviceId]);
  
      return { success: true, message: 'Servicio modificado con exito', serviceId: result.insertId };
    } catch (error) {
      console.error('Error al modificar el servicio:', error);
      return { success: false, message: 'Error al modificar el servicio' };
    }
};


//BORRAR
const deleteService = async (serviceId) => {
    try {
      const query = 'DELETE FROM services WHERE id = ?';
      const [result] = await db.execute(query, [serviceId]);
  
      if (result.affectedRows > 0) {
        return { success: true, message: 'Servicio eliminado' };
      } else {
        return { success: false, message: 'No existe servicio con ese ID' };
      }
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      return { success: false, message: 'Error al eliminar el servicio' };
    }
};

module.exports = { getServices, createService, modifyService, deleteService };

