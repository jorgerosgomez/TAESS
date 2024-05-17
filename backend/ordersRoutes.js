const express = require('express');
const router = express.Router();
const ordersControler = require('./ordersControler');

// RUTA LISTAR TODOS
router.get('/orders', async (req, res) => {
    const result = await ordersControler.getOrders();
    if (result.success) {
        res.status(200).json( {success: true, services: result.services});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/orders', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id_product, price, amount } = req.body;
    const result = await ordersControler.createOrder(id_product, price, amount);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/orders/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { id_product, price, amount } = req.body;
    const result = await ordersControler.modifyOrder(id, id_product, price, amount);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const result = await ordersControler.deleteOrder(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;

