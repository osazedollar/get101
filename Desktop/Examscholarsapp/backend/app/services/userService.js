// userService.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const emailService = require('../utils/emailService');

module.exports = {
  async signup(userData) {
    // Check if confirmPassword field is missing
    if (!userData.confirmPassword) {
      throw new Error('Confirm password is required');
    }

    // Validate user data
    // Example validation: Check if email is already registered
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Validate password and confirmPassword match
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user record in the database
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
      confirmPassword: userData.confirmPassword
    });
    
    await newUser.save();

    // Send email notification
    await emailService.sendSignupEmail(newUser.email);

    return newUser;
  },

  async signin(email, password) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Return user object or token/session for authentication
    return user;
  }
};
