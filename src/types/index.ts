export interface User {
    id: string;
    username: string;
    password: string;
    role: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface CartItem {
    userId: string;
    productId: string;
    quantity: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    totalPrice: number;
}