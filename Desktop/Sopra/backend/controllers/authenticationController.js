// authenticationController.js

// Import necessary modules
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function for authentication
async function authenticate(req, res, next) {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, 'my_dog_is_badass');

        // Check if the user exists in the database
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user object to the request for future use
        req.user = user;

        // Call next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Export the middleware function
module.exports = {
    authenticate
};
