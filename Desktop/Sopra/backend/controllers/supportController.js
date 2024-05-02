// supportController.js

// Example middleware function for contacting customer support
function contactSupport(req, res) {
    // Contact support logic here
    res.json({ message: 'Contact customer support' });
}

// Export the middleware function
module.exports = {
    contactSupport
};
