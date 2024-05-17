const fetchBarbers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/barbers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los barberos');
      }
  
      return data;
    } catch (error) {
      console.error('Error al obtener los barberos:', error);
      throw new Error('Hubo un problema al obtener los barberos');
    }
  };
  
const createOrUpdateBarber = async (barber) => {
    try {
      const method = barber.id ? 'PATCH' : 'POST';
      const url = barber.id ? `http://localhost:5000/api/barbers/${barber.id}` : 'http://localhost:5000/api/barbers';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(barber),
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al guardar el barbero');
      }
  
      return data;

    } catch (error) {
      console.error('Error saving barber:', error);
      throw error;
    }
  };
  
const deleteBarber = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/barbers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar el barbero');
      }
  
      return data;

    } catch (error) {
      console.error('Error al eliminar el barbero:', error);
      throw error;
    }
  };

export { fetchBarbers, createOrUpdateBarber, deleteBarber };
