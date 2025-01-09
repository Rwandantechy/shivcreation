const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 20,
    required: true,
  },
})

const admin = mongoose.model('admin', adminSchema)

module.exports = admin
