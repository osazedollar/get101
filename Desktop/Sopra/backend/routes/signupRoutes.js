const express = require('express');
const router = express.Router();
const DeliveryAgent = require('../models/deliveryAgent');


// Route to handle delivery agent registration (first stage: SignUp)
router.post('/', async (req, res) => {
  try {
    // Extract data from request body for first stage
    const { email, phone, location, privacyCheckbox } = req.body;

    // Create a new delivery agent instance for first stage
    const newDeliveryAgent = new DeliveryAgent({
      email,
      phone,
      location,
      privacyCheckbox,
    });

    // Save the delivery agent data to the database
    await newDeliveryAgent.save();

    res.status(201).json({ message: 'Delivery agent signed up successfully', deliveryAgent: newDeliveryAgent });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up delivery agent', error: error.message });
  }
});


module.exports = router;

// Add routes for other stages of delivery agent registration
