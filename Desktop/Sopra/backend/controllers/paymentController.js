// paymentController.js

// Example middleware function for processing payment
function processPayment(req, res) {
    // Process payment logic here
    res.json({ message: 'Process payment' });
}

// Export the middleware function
module.exports = {
    processPayment
};
