const express = require('express');
const router = express.Router();
const servicesControler = require('./servicesControler');

// RUTA LISTAR TODOS
router.get('/services', async (req, res) => {
    const result = await servicesControler.getServices();
    if (result.success) {
        res.status(200).json( {success: true, services: result.services});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/services', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { name, description, duration, price } = req.body;
    const result = await servicesControler.createService(name, description, duration, price);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/services/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { name, description, duration, price } = req.body;
    const result = await servicesControler.modifyService(name, description, duration, price, id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/services/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const result = await servicesControler.deleteService(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;


// DEBERE ANADIR LAS SIGUIENTES LINEAS A index.js PARA QUE SEAN FUNCIONALES LAS RUTAS
/*

const servicesRoutes = require('./servicesRoutes');

const app = express(); //(esta ya deberua estar)

app.use(express.json());
app.use('/api', servicesRoutes);


*/