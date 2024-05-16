const express = require('express');
const router = express.Router();
const reservationsControler = require('./reservationsControler');

// RUTA LISTAR TODOS
router.get('/reservations', async (req, res) => {
    const result = await reservationsControler.getReservations();
    if (result.success) {
        res.status(200).json( {success: true, reservas: result.services});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/reservations', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { idCliente, idBarbero, fecha, servicio } = req.body;
    const result = await reservationsControler.createReservation(idCliente, idBarbero, fecha, servicio);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/reservations/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { idCliente, idBarbero, fecha, servicio } = req.body;
    const result = await reservationsControler.modifyReservation(id, idCliente, idBarbero, fecha, servicio);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/reservations/:id', async (req, res) => {
    const { id } = req.params;
    const result = await reservationsControler.deleteReservation(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;


