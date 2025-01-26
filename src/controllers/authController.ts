import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            await this.authService.logout(req.user);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    public async changePassword(req: Request, res: Response): Promise<void> {
        try {
            await this.authService.changePassword(req.user, req.body);
            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}