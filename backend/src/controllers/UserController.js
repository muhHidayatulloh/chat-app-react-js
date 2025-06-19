const {User} = require('../models');
const logger = require('../config/logger');
const response = require('../utils/responseHelper');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to retrieve messages :' + error });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to retrieve user : ' + error });
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if (!user) {
            response.fail(res, 'User not found', 404);
        } else {
            response.success(res, user);
        }
    } catch (error) {
        logger.error(error);
        response.fail(res, 'Failed to retrieve user : ' + error, 500, error);
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({where: {email : req.params.email}});
        if(!user) {
            response.fail(res, 'User not found', 404);
        } else {
            response.success(res, user);
        }
    } catch {
        logger.error(error);
        response.fail(res, 'Failed to retrieve user : ' + error, 500, error);
    }
}

module.exports = {
    getUsers, 
    getUser,
    getUserByUsername,
    getUserByEmail
}