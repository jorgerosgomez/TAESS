

export const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reservations');
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
        body: JSON.stringify(reservation),
      });
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
        throw new Error(`Failed to delete reservation with id ${id}`);
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }

};