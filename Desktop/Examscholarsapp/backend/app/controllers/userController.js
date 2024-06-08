// userController.js

const userService = require('../services/userService');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.userId, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

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
