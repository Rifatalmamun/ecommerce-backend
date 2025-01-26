class ProductModel {
    constructor() {
        this.products = [];
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    createProduct(product) {
        this.products.push(product);
    }

    updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
    }
}

module.exports = ProductModel;
