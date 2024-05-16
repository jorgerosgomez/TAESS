export const fetchUsers = async () => {
  const response = await fetch('http://localhost:5000/api/users');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener los usuarios');
  }
  return data;
};

export const createOrUpdateUser = async (user) => {
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
    throw new Error(error.message || 'Hubo un problema al guardar el usuario');
  }
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar el usuario');
  }
  return data;
};
