// notificationController.js

// Example middleware function for sending notifications
function sendNotification(req, res) {
    // Send notification logic here
    res.json({ message: 'Send notification' });
}

// Export the middleware function
module.exports = {
    sendNotification
};
