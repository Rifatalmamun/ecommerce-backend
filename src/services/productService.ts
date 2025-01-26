import { Product } from '../models/productModel';

export class ProductService {
    private products: Product[] = [];

    public createProduct(product: Product): Product {
        this.products.push(product);
        return product;
    }

    public getAllProducts(): Product[] {
        return this.products;
    }

    public getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    public updateProduct(id: number, updatedProduct: Product): Product | undefined {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            return this.products[index];
        }
        return undefined;
    }

    public deleteProduct(id: number): boolean {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}