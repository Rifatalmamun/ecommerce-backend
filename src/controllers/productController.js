const { Request, Response } = require('express');
const ProductService = require('../services/productService');

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productService.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

    async filterProducts(req, res) {
        const { category, attributes } = req.query;
        try {
            const filteredProducts = await this.productService.filterProducts(category, attributes);
            res.status(200).json(filteredProducts);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering products' });
        }
    }
}

module.exports = ProductController;
