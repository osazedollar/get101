// Import required modules
const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');

// Create Express app
const app = express();

// Initialize Google Maps client
const googleMapsClient = new Client({});

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to create pickup and destination points
app.post('/create-points', async (req, res) => {
  try {
    const { pickupAddress, destinationAddress } = req.body;
    const pickupResponse = await googleMapsClient.geocode({
      params: {
        address: pickupAddress,
        key: process.env.GOOGLE_MAPS_API_KEY, // Use your Google Maps API key
      },
    });
    const pickupLocation = pickupResponse.data.results[0].geometry.location;

    // Convert destination address to geographic coordinates
    const destinationResponse = await googleMapsClient.geocode({
      params: {
        address: destinationAddress,
        key: process.env.GOOGLE_MAPS_API_KEY, // Use your Google Maps API key
      },
    });
    const destinationLocation = destinationResponse.data.results[0].geometry.location;
    // Return the coordinates of the pickup and destination points
    res.json({
      pickup: pickupLocation,
      destination: destinationLocation,
    });
  } catch (error) {
    console.error('Error creating points:', error);
    res.status(500).json({ message: 'Error creating points' });
  }
});
