const createService = async (name, description, price, duration) => {
    //Ruta donde haremos las peticiones
    const endpoint = 'http://localhost:5000/api/services';
    const payload = JSON.stringify({ name, description, price, duration });
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export { createService };
  