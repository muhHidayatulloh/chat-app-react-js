const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'secret',
}