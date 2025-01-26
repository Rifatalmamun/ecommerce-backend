const express = require('express');
const router = express.Router();

// Mock product data
const products = [];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get a single product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Create a new product
router.post('/', (req, res) => {
    const { name, price, description } = req.body;
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const product = { id, name, price, description };
    products.push(product);
    res.status(201).json(product);
});

// Update a product by ID
router.put('/:id', (req, res) => {
    const { name, price, description } = req.body;
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;