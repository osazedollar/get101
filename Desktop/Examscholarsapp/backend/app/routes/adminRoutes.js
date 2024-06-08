// app/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define admin dashboard route
router.get('/dashboard', adminController.dashboard);

// Define route to delete a user
router.get('/users', adminController.viewUsers);
router.delete('/users/:userId', adminController.deleteUser);

module.exports = router;
