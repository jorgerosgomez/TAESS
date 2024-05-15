const registerUser = async (fullName, username, email, password, telephone) => {
  // Incluye el dominio completo y el puerto en el endpoint
  const endpoint = 'http://localhost:5000/api/register';
  const payload = JSON.stringify({ fullName, username, email, password, telephone });

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

export { registerUser };
