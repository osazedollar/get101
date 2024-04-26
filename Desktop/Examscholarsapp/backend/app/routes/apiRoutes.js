const express = require('express');
const router = express.Router();


// Import your routes
const userRoutes = require('./userRoutes');

// Define routes
router.use('/users', userRoutes);

module.exports = router;
