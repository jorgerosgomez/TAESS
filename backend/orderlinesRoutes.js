const express = require('express');
const router = express.Router();
const orderlinesControler = require('./orderlinesControler');

// RUTA LISTAR TODOS
router.get('/orderlines', async (req, res) => {
    const result = await orderlinesControler.getOrderLines();
    if (result.success) {
        res.status(200).json( {success: true, services: result.services});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/orderlines', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id_client, id_barber, date_order } = req.body;
    const result = await orderlinesControler.createOrderLine(id_client, id_barber, date_order);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/orderlines/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { id_client, id_barber, date_order } = req.body;
    const result = await orderlinesControler.modifyOrderLine(id, id_client, id_barber, date_order);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/orderlines/:id', async (req, res) => {
    const { id } = req.params;
    const result = await orderlinesControler.deleteOrderLine(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;


