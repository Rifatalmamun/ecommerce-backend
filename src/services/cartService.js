const { CartModel } = require('../models/cartModel');

class CartService {
    async addItem(userId, productId, quantity) {
        const cartItem = await CartModel.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            const newCartItem = new CartModel({ userId, productId, quantity });
            await newCartItem.save();
        }
    }

    async removeItem(userId, productId) {
        await CartModel.deleteOne({ userId, productId });
    }

    async updateItem(userId, productId, quantity) {
        const cartItem = await CartModel.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
        }
    }

    async getCart(userId) {
        return await CartModel.find({ userId }).populate('productId');
    }
}

module.exports = { CartService };