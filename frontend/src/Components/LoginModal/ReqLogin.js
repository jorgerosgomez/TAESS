const loginUser = async (username, password) => {
  const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
  }
  return data;
};

export default loginUser;