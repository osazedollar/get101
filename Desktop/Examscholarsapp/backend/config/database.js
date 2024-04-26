const mongoose = require('mongoose');

module.exports = {
  connect: function() {
    const url = process.env.DATABASE_URL || 'mongodb+srv://sarzonline:4G2TtuS0pkX3AsU0@cluster0.nwshipo.mongodb.net/examscholarapp';
    mongoose.connect(url)
      .then(() => console.log('Connected to database'))
      .catch((err) => console.error('Database connection error:', err));
  }
};
