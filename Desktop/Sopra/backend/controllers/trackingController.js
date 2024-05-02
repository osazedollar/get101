// trackingController.js

// Example middleware function for tracking an order
function trackOrder(req, res) {
    // Track order logic here
    res.json({ message: 'Track order' });
}

// Export the middleware function
module.exports = {
    trackOrder
};
