const express = require('express');
const router = express.Router();
const DeliveryAgent = require('../models/deliveryAgent');


// Route to handle delivery agent registration (third stage: Driver License or JTB Form Number)
router.post('/', async (req, res) => {
  try {
    // Extract data from request body for third stage
    const { driverLicenseOrJTB } = req.body;

    // Find the delivery agent by ID
    const deliveryAgent = await DeliveryAgent.findById(req.body.deliveryAgentId);

    // Update delivery agent's driver license or JTB form number
    deliveryAgent.driverLicenseOrJTB = driverLicenseOrJTB;

    // Save the updated delivery agent data to the database
    await deliveryAgent.save();

    res.status(200).json({ message: 'Driver license or JTB form number updated successfully', deliveryAgent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver license or JTB form number', error: error.message });
  }
});


module.exports = router;

// Add routes for other stages of delivery agent registration
