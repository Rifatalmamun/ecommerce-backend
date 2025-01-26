const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        this.users = []; // This would typically be replaced with a database call
    }

    async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: this.users.length + 1, username, password: hashedPassword, role: 'user' };
        this.users.push(newUser);
        return newUser;
    }

    async login(username, password) {
        const user = this.users.find(user => user.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
            return token;
        }
        return null;
    }

    logout(token) {
        // Implement logout logic, such as invalidating the token
    }

    async validateUser(username, password) {
        const user = this.users.find(user => user.username === username);
        return user ? await bcrypt.compare(password, user.password) : false;
    }
}

module.exports = AuthService;