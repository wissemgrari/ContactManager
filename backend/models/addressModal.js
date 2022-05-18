const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  state: String,
  city: String,
  street: String,
  zipCode: {
    type: Number,
    default: 1000,
    max: 9999,
    min: 111,
  },
});

module.exports = addressSchema;
