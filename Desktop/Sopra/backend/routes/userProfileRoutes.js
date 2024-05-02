// userProfileRoutes.js

const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userProfile');

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email, phoneNumber } = req.body;
    
    // Find the user profile by user ID
    let userProfile = await UserProfile.findOne({ user: userId });
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    // Update user profile fields
    userProfile.name.firstName = firstName;
    userProfile.name.lastName = lastName;
    userProfile.email = email;
    userProfile.phoneNumber = phoneNumber;
    
    // Save the updated user profile
    userProfile = await userProfile.save();

    res.json({ message: 'User profile updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

module.exports = router;
