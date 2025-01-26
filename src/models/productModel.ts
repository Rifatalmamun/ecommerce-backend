export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

export class ProductModel {
    private products: Product[] = [];

    public getAllProducts(): Product[] {
        return this.products;
    }

    public getProductById(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    public createProduct(product: Product): void {
        this.products.push(product);
    }

    public updateProduct(id: string, updatedProduct: Partial<Product>): void {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
        }
    }

    public deleteProduct(id: string): void {
        this.products = this.products.filter(product => product.id !== id);
    }
}