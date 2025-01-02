const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const logger = require('../config/logger');

// Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    logger.info(`Login request: ${email}`);
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // cek req password
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        logger.error(error);

        // During development, send detailed error information
        const errorMessage = process.env.NODE_ENV === 'development' ? error.message : 'Server error';

        res.status(500).json({ message: errorMessage, error: errorMessage });
    }
};

const updatePassword = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        user.password_hash = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        // During development, send detailed error information
        const errorMessage = process.env.NODE_ENV === 'development' ? error.message : 'Server error';
        res.status(500).json({ message: errorMessage, error: errorMessage });
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.body.token;
        if(!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newToken = jwt.sign({ id: user.id }, config.jwtSecret, {
            expiresIn: '1h',
        });

        res.status(200).json({ user, token: newToken });
    } catch (error) {
        // During development, send detailed error information
        const errorMessage = process.env.NODE_ENV === 'development' ? error.message : 'Server error';
        res.status(500).json({ message: errorMessage, error: errorMessage });
    }
}

module.exports = {
    register,
    login,
    updatePassword,
    refreshToken
}