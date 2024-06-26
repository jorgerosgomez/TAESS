const express = require('express');
const router = express.Router();
const barbersControler = require('./barbersControler');

// RUTA LISTAR TODOS
router.get('/barbers', async (req, res) => {
    const result = await barbersControler.getBarbers();
    if (result.success) {
        res.status(200).json( {success: true, barbers: result.barbers});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/barbers', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { name, email, phone, available } = req.body;
    const result = await barbersControler.createBarber(name, email, phone, available);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/barbers/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { name, email, phone, available } = req.body;
    const result = await barbersControler.modifyBarber(name, email, phone, available, id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/barbers/:id', async (req, res) => {
    const { id } = req.params;
    const result = await barbersControler.deleteBarber(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;


