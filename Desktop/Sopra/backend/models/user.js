const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  verificationCode: {
    type: String, // Assuming the verification code is a string
    required: true,
  },
  // Other fields as needed
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



const User = mongoose.model('User', userSchema);

module.exports = User;

//signature: Great things with small beginnings.
