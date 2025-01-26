const express = require('express');
const router = express.Router();

// Mock cart data
const cartItems = [];

// Get all cart items for a user
router.get('/:userId', (req, res) => {
    const userCartItems = cartItems.filter(item => item.userId === parseInt(req.params.userId));
    res.json(userCartItems);
});

// Add an item to the cart
router.post('/', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const id = cartItems.length ? cartItems[cartItems.length - 1].id + 1 : 1;
    const cartItem = { id, userId, productId, quantity };
    cartItems.push(cartItem);
    res.status(201).json(cartItem);
});

// Update the quantity of an item in the cart
router.put('/:id', (req, res) => {
    const { quantity } = req.body;
    const cartItem = cartItems.find(item => item.id === parseInt(req.params.id));
    if (cartItem) {
        cartItem.quantity = quantity;
        res.json(cartItem);
    } else {
        res.status(404).send('Cart item not found');
    }
});

// Remove an item from the cart
router.delete('/:id', (req, res) => {
    const index = cartItems.findIndex(item => item.id === parseInt(req.params.id));
    if (index !== -1) {
        cartItems.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Cart item not found');
    }
});

module.exports = router;