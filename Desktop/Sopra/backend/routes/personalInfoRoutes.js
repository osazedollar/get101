const express = require('express');
const router = express.Router();
const DeliveryAgent = require('../models/deliveryAgent');


// Route to handle delivery agent registration (second stage: Personal Information)
router.post('/', async (req, res) => {
  try {
    // Extract data from request body for second stage
    const { firstName, lastName, gender, referralCode, vehicleYear, vehicleManufacturer, vehicleModel, licensePlate, vehicleColor } = req.body;

    // Find the delivery agent by ID
    const deliveryAgent = await DeliveryAgent.findById(req.body.deliveryAgentId);

    // Update delivery agent's personal information
    deliveryAgent.name.firstName = firstName;
    deliveryAgent.name.lastName = lastName;
    deliveryAgent.gender = gender;
    deliveryAgent.referralCode = referralCode;
    deliveryAgent.vehicle.year = vehicleYear;
    deliveryAgent.vehicle.manufacturer = vehicleManufacturer;
    deliveryAgent.vehicle.model = vehicleModel;
    deliveryAgent.vehicle.licensePlate = licensePlate;
    deliveryAgent.vehicle.color = vehicleColor;

    // Save the updated delivery agent data to the database
    await deliveryAgent.save();

    res.status(200).json({ message: 'Personal information updated successfully', deliveryAgent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating personal information', error: error.message });
  }
});

module.exports = router;

// Add routes for other stages of delivery agent registration
