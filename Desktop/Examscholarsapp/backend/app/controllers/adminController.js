// app/controllers/adminController.js

const User = require('../models/User');

module.exports = {
  async dashboard(req, res) {
    try {
      // Fetch all users from the database
      const users = await User.find();
      
      // Render admin dashboard view with user data
      res.render('admin/dashboard', { users });
    } catch (error) {
      // Handle errors
      res.status(500).send('Internal server error');
    }
  },

  async deleteUser(req, res) {
    try {
      // Retrieve userId from request parameters
      const { userId } = req.params;

      // Delete user from the database
      await User.findByIdAndDelete(userId);

      // Redirect to user management page after deletion
      res.redirect('/admin/dashboard');
    } catch (error) {
      // Handle errors
      res.status(500).send('Internal server error');
    }
  }
};
