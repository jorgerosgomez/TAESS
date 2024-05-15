const express = require('express');
const router = express.Router();
const servicesControler = require('./rutasControler');

// RUTA LISTAR TODOS
router.get('/reservas', async (req, res) => {
    const result = await reservasControler.getReservas();
    if (result.success) {
        res.status(200).json( {success: true, reservas: result.services});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/reservas', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { idCliente, idBarbero, fecha, servicio } = req.body;
    const result = await reservasControler.createReserva(idCliente, idBarbero, fecha, servicio);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/reservas/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { idCliente, idBarbero, fecha, servicio } = req.body;
    const result = await reservasControler.modifyReserva(id, idCliente, idBarbero, fecha, servicio);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/reservas/:id', async (req, res) => {
    const { id } = req.params;
    const result = await servicesControler.deleteService(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;


