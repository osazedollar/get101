const express = require('express');
const router = express.Router();
const DeliveryAgent = require('../models/deliveryAgent');


// Route to handle delivery agent registration (review stage)
router.post('/', async (req, res) => {
  try {
    // Extract data from request body for review stage
    // Assuming all required data for review is passed in the request body

    // Find the delivery agent by ID
    const deliveryAgent = await DeliveryAgent.findById(req.body.deliveryAgentId);

    // Perform any additional validation or checks before final review

    // If everything is satisfactory, mark the delivery agent as pending review
    deliveryAgent.status = 'Pending Review';

    // Save the updated delivery agent data to the database
    await deliveryAgent.save();

    res.status(200).json({ message: 'Delivery agent registration under review', deliveryAgent });
  } catch (error) {
    res.status(500).json({ message: 'Error processing review', error: error.message });
  }
});


module.exports = router;

// Add routes for other stages of delivery agent registration
