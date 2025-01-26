import { User } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    private users: User[] = []; // This would typically be replaced with a database call

    async register(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: User = { id: this.users.length + 1, username, password: hashedPassword, role: 'user' };
        this.users.push(newUser);
        return newUser;
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = this.users.find(user => user.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
            return token;
        }
        return null;
    }

    logout(token: string): void {
        // Implement logout logic, such as invalidating the token
    }

    async validateUser(username: string, password: string): Promise<boolean> {
        const user = this.users.find(user => user.username === username);
        return user ? await bcrypt.compare(password, user.password) : false;
    }
}