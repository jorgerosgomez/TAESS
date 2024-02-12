// index.js o server.js

// Importa Express
const express = require('express');

// Crea una nueva instancia de Express
const app = express();

// Define el puerto en el que el servidor estará escuchando
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Define una ruta raíz y envía una respuesta simple
app.get('/', (req, res) => {
  res.send('ahora?');
});

// Ruta de ejemplo que podría usarse para manejar solicitudes a tu API
app.get('/api', (req, res) => {
  res.json({ mensaje: "Esto es una respuesta de prueba desde tu API" });
});

// Hace que el servidor escuche en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
