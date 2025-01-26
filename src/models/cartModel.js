class Cart {
    constructor(userId) {
        this.userId = userId;
        this.items = [];
    }

    addItem(productId, quantity, price) {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += price * quantity;
        } else {
            this.items.push({ userId: this.userId, productId, quantity, totalPrice: price * quantity });
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.productId !== productId);
    }

    updateItem(productId, quantity, price) {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity = quantity;
            existingItem.totalPrice = price * quantity;
        }
    }

    getCart() {
        return this.items;
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.totalPrice, 0);
    }
}

module.exports = Cart;
