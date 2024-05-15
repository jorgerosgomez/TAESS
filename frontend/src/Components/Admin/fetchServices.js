

export const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      console.log('Fetched services:', data.services);
      return data.services;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  };
  
  export const createOrUpdateService = async (service) => {
    try {
      const method = service.id ? 'PATCH' : 'POST';
      const url = service.id ? `http://localhost:5000/api/services/${service.id}` : 'http://localhost:5000/api/services';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving service:', error);
      throw error;
    }
  };
  
  export const deleteService = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete service with id ${id}`);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
    
};
  