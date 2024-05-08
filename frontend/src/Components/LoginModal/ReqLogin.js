
const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      return data; // Devuelve la respuesta del servidor
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Hubo un problema al iniciar sesión');
    }
  };
  
  export default loginUser;
  