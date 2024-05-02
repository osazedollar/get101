const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../services/emailService');
const sendWelcomeEmail = require('../services/welcomeEmailService');
const generateVerificationCode = require('../utils/generateVerificationCode');
const { validationResult, check } = require('express-validator');
const validator = require('validator'); // Import the validator package
const UserProfile = require('../models/userProfile');



// Middleware to parse JSON request bodies
router.use(bodyParser.json());

// Middleware to parse URL-encoded request bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Middleware function to validate user input
const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = new User({ email, phone, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register a new user
router.post('/register', [
  // Validate email or phone
  check('emailOrPhone').notEmpty().custom((value, { req }) => {
    // Check if the value is either an email or a phone number
    if (!validator.isEmail(value) && !validator.isMobilePhone(value, 'any', { strictMode: false })) {
      throw new Error('Invalid email or phone number');
    }
    return true;
  }),
  // Validate password (minimum length 6 characters)
  check('password').isLength({ min: 6 }),
], validateInput, async (req, res) => {
  try {

    const { emailOrPhone, password } = req.body;
    // Check if the email or phone is already registered
    const existingUser = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already exists' });
    }
    // Generate a 6-digit verification code
    const verificationCode = generateVerificationCode();
    // Create a new user with hashed password and verification code
    const user = new User({ email: emailOrPhone, phone: emailOrPhone, password, verificationCode });
    await user.save();
    // Send registration email with the verification code
    await sendVerificationEmail(user.email, verificationCode);
    
    // Create a userProfile with empty FirstName and LastName fields
    const userProfile = new UserProfile({
      user: user._id,
      name: {
        firstName: '',
        lastName: ''
      },
      phoneNumber: '', // Add an empty string for phoneNumber
    });
    await userProfile.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});


// Login
router.post('/login', [
  // Validate email or phone
  check('emailOrPhone').notEmpty().custom((value) => {
    if (!validator.isEmail(value) && !validator.isMobilePhone(value, 'any')) {
      throw new Error('Invalid email or phone number');
    }
    return true;
  }),
  // Validate password (minimum length 6 characters)
  check('password').isLength({ min: 6 }),
], validateInput, async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    // Find the user by email or phone
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'my_dog_is_badass', { expiresIn: '3d' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


// Verify user with verification code
router.post('/verify', async (req, res) => {
  try {
      const { emailOrPhone, verificationCode } = req.body;
      // Find user by email or phone
      const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      // Check if verification code matches
      if (user.verificationCode !== verificationCode) {
          return res.status(400).json({ message: 'Invalid verification code' });
      }

      // Send welcome email to the user
      await sendWelcomeEmail(user.email);

      // Code verification successful
      res.json({ message: 'Verification successful' });
  } catch (error) {
      console.error('Error verifying user:', error);
      res.status(500).json({ message: 'Error verifying user' });
  }
});







module.exports = router;
