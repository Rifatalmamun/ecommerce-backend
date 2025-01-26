import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
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

    public async filterProducts(req: Request, res: Response): Promise<void> {
        const { category, attributes } = req.query;
        try {
            const filteredProducts = await this.productService.filterProducts(category, attributes);
            res.status(200).json(filteredProducts);
        } catch (error) {
            res.status(500).json({ message: 'Error filtering products' });
        }
    }
}

export default ProductController;