const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }, 
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', UserSchema);
