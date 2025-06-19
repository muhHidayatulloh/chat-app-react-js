const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.get('/getByUsername/:username', UserController.getUserByUsername);
router.get('/getByEmail/:email', UserController.getUserByEmail);

module.exports = router;