
const registerProduct = async (name, description, stock, price, sales, stock_min) => {
  // Incluye el dominio completo y el puerto en el endpoint
  const endpoint = 'http://localhost:5000/api/addProduct';
  const payload = JSON.stringify({ name, description, stock, price, sales, stock_min });

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

export { registerProduct };
