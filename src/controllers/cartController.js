class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    async addItem(req, res) {
        try {
            const { userId, productId, quantity } = req.body;
            const cartItem = await this.cartService.addItem(userId, productId, quantity);
            res.status(201).json(cartItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeItem(req, res) {
        try {
            const { userId, productId } = req.params;
            await this.cartService.removeItem(userId, productId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateItem(req, res) {
        try {
            const { userId, productId } = req.params;
            const { quantity } = req.body;
            const updatedItem = await this.cartService.updateItem(userId, productId, quantity);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCart(req, res) {
        try {
            const { userId } = req.params;
            const cart = await this.cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CartController;