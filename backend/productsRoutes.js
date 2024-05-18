const express = require('express');
const router = express.Router();
const productcontroler = require('./productcontroler');

// RUTA LISTAR TODOS
router.get('/products', async (req, res) => {
    const result = await productcontroler.getProducts();
    if (result.success) {
        res.status(200).json( {success: true, products: result.products});
    } else {
        res.status(404).json({ message: result.message });
    }
});

// RUTA CREAR
router.post('/products', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { name, description, stock, price, sales, stock_min} = req.body;
    const result = await productcontroler.createProduct(name, description, stock, price, sales, stock_min);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA MODIFICAR
router.patch('/products/:id', async (req, res) => {
    if (!req.is('application/json')) {
        return res.status(400).json({ success: false, message: 'El tipo de contenido no es application/json' });
      }

    const { id } = req.params;
    const { name, description, stock, price, sales, stock_min } = req.body;
    const result = await productcontroler.modifyProduct(name, description, stock, price, sales, stock_min, id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

// RUTA BORRAR
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const result = await productcontroler.deleteProduct(id);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;


// DEBERE ANADIR LAS SIGUIENTES LINEAS A index.js PARA QUE SEAN FUNCIONALES LAS RUTAS
/*

const productsRoutes = require('./productsRoutes');

const app = express(); //(esta ya deberua estar)

app.use(express.json());
app.use('/api', productsRoutes);


*/