const express = require('express');
const router = express.Router();

// Import controllers for each feature
//const authenticationController = require('../controllers/authenticationController');
//const profileController = require('../controllers/profileController');
//const orderController = require('../controllers/orderController');
//const paymentController = require('../controllers/paymentController');
//const ratingController = require('../controllers/ratingController');
//const trackingController = require('../controllers/trackingController');
//const supportController = require('../controllers/supportController');
//const promotionController = require('../controllers/promotionController');
//const languageController = require('../controllers/languageController');
//const notificationController = require('../controllers/notificationController');
const geocodingController = require('../controllers/geocodingController');

// Routes for each feature
//router.use('/auth', authenticationController);
//router.use('/profile', profileController);
//router.use('/order', orderController);
//router.use('/payment', paymentController);
//router.use('/rating', ratingController);
//router.use('/tracking', trackingController);
//router.use('/support', supportController);
//router.use('/promotion', promotionController);
//router.use('/language', languageController);
//router.use('/notification', notificationController);

module.exports = router;
