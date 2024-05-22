export const fetchReservations = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/reservations');
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    const data = await response.json();
    console.log('Fetched reservations:', data.reservas);
    return data.reservas;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};

export const createOrUpdateReservation = async (reservation) => {
  try {
    const method = reservation.id ? 'PATCH' : 'POST';
    const url = reservation.id ? `http://localhost:5000/api/reservations/${reservation.id}` : 'http://localhost:5000/api/reservations';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idCliente: reservation.idCliente,
        idBarbero: reservation.idBarbero,
        fecha: reservation.fecha,
        servicio: reservation.servicio,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save reservation');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving reservation:', error);
    throw error;
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to delete reservation with id ${id}`);
    }
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
};
export const fetchServices = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/services');
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    console.log('Fetched services:', data.services);
    return data.services;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};
export const fetchClients = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users'); 
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    const data = await response.json();
    console.log('Fetched clients:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};


export const fetchBarbers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/barbers');
    if (!response.ok) {
      throw new Error('Failed to fetch barbers');
    }
    const data = await response.json();
    console.log('Fetched barbers:', data.barbers);
    return data.barbers;
  } catch (error) {
    console.error('Error fetching barbers:', error);
    throw error;
  }
};
