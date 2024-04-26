const userService = require('../services/userService');

module.exports = {
  async signup(req, res) {
    try {
      // Check if confirmPassword field is missing
      if (!req.body.confirmPassword) {
        throw new Error('Confirm password is required');
      }

      const user = await userService.signup(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const user = await userService.login(req.body);
      res.json(user);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
};
