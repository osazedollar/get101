const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Define routes for user operations
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
