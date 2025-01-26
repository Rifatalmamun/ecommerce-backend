const { Product } = require('../models/productModel');

class ProductService {
    constructor() {
        this.products = [];
    }

    createProduct(product) {
        this.products.push(product);
        return product;
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            return this.products[index];
        }
        return undefined;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = { ProductService };