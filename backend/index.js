const express = require('express');
const cors = require('cors'); // Importa CORS
const { createUser,  getUsers } = require('./usercontroler');
const { loginUser } = require('./loginUser');
const { getEventos } = require('./scripts/getEventos');
const { getProducts } = require('./productcontroler');
const { createProduct } = require('./productcontroler');
const servicesRoutes = require('./servicesRoutes');

const app = express();
app.use(express.json());
app.use(cors());

//SE MONTAN LAS RUTAS DE SERVICIOS EN /api
app.use('/api', servicesRoutes);

app.post('/api/register', async (req, res) => {

  if (!req.is('application/json')) {
    return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
  }

  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: 'El cuerpo de la solicitud está vacío' });
  }

  // Desestructurar 'username', 'email' y 'password' del cuerpo de la solicitud
  const { fullName, username, email, password, telephone } = req.body;
  
  // Llamada a 'createUser'
  const result = await createUser(fullName, username, email, password, telephone);

  if (result.success) {
    res.json({ success: true, message: 'Usuario registrado con éxito', userId: result.userId });
  } else {
    // Considera manejar diferentes códigos de estado HTTP dependiendo del error
    res.status(500).json({ success: false, message: result.message });
  }
});

app.post('/api/login', async (req, res) => {
 
  console.log('Se recibió una solicitud de inicio de sesión')
  if (!req.is('application/json')) {
    return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
  }

  const { username, password } = req.body;

  // Llama a la función controladora para iniciar sesión
  const result = await loginUser(username, password);

  if (result.success) {
    res.json({ success: true, message: 'Inicio de sesión exitoso', token: result.token });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});
app.get('/api/users', async (req, res) => {
  const result = await getUsers();
  if (result.success) {
    res.json(result.users);
  } else {
    res.status(500).json({ message: result.message });
  }
});

app.get('/api/eventos', async (req, res) => {
  const { day } = req.query;
  if (!day) {
    return res.status(400).json({ success: false, message: 'La fecha es requerida' });
  }

  try {
    const eventos = await getEventos(day);
    res.json({ success: true, data: eventos });
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los eventos', error: error.toString() });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts(); 
    res.json({ success: true, message: 'Productos obtenidos con éxito', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los productos', error: error.message });
  }
});

app.post('/api/addProduct', async (req, res) => {

  if (!req.is('application/json')) {
    return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
  }

  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: 'El cuerpo de la solicitud está vacío' });
  }

  // Desestructurar 'username', 'email' y 'password' del cuerpo de la solicitud
  const { name, description, stock, price, sales, stock_min } = req.body;
  
  // Llamada a 'createUser'
  const result = await createProduct(name, description, stock, price, sales, stock_min);

  if (result.success) {
    res.json({ success: true, message: 'Producto añadido con éxito', userId: result.userId });
  } else {
    // Considera manejar diferentes códigos de estado HTTP dependiendo del error
    res.status(500).json({ success: false, message: result.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
