const express = require('express');
const router = express.Router();
const productcontroler = require('./productcontroler');

// RUTA LISTAR TODOS
router.get('/products', async (req, res) => {
    const result = await productcontroler.getProducts();
    if (result.success) {
        res.json({ success: true, message: 'Productos obtenidos con éxito', data: products });
    } else {
        res.status(500).json({ success: false, message: 'Error al obtener los productos', error: error.message });
    }
});
  

// RUTA CREAR
router.post('/product', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { name, description, stock, price, sales, stock_min } = req.body;
    const result = await productcontroler.createProduct(name, description, stock, price, sales, stock_min);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/product/:id', async (req, res) => {
    if(!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const {name, description, stock, price, sales, stock_min} = req.body;
    const result = await productcontroler.modifyProduct(name, description, stock, price, sales, stock_min);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/product/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const result = await productcontroler.deleteProduct(id);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;



