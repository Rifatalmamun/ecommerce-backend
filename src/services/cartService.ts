import { CartModel } from '../models/cartModel';

export class CartService {
    async addItem(userId: string, productId: string, quantity: number) {
        const cartItem = await CartModel.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            const newCartItem = new CartModel({ userId, productId, quantity });
            await newCartItem.save();
        }
    }

    async removeItem(userId: string, productId: string) {
        await CartModel.deleteOne({ userId, productId });
    }

    async updateItem(userId: string, productId: string, quantity: number) {
        const cartItem = await CartModel.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity = quantity;
            await cartItem.save();
        }
    }

    async getCart(userId: string) {
        return await CartModel.find({ userId }).populate('productId');
    }
}