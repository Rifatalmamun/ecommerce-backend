export interface CartItem {
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
}

export class Cart {
    private items: CartItem[] = [];

    constructor(public userId: string) {}

    addItem(productId: string, quantity: number, price: number): void {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += price * quantity;
        } else {
            this.items.push({ userId: this.userId, productId, quantity, totalPrice: price * quantity });
        }
    }

    removeItem(productId: string): void {
        this.items = this.items.filter(item => item.productId !== productId);
    }

    updateItem(productId: string, quantity: number, price: number): void {
        const existingItem = this.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity = quantity;
            existingItem.totalPrice = price * quantity;
        }
    }

    getCart(): CartItem[] {
        return this.items;
    }

    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.totalPrice, 0);
    }
}