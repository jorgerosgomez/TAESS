

const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los usuarios');
      }
  
      return data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw new Error('Hubo un problema al obtener los usuarios');
    }
  };
  
  const createOrUpdateUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id || ''}`, {
        method: user.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al guardar el usuario');
      }
  
      return data;
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      throw new Error('Hubo un problema al guardar el usuario');
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar el usuario');
      }
  
      return data;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw new Error('Hubo un problema al eliminar el usuario');
    }
  };
  
  export { fetchUsers, createOrUpdateUser, deleteUser };
  