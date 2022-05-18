const mongoose = require('mongoose');
const adressSchema = require('./addressModal');

const contactSchema = mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: [true, 'Please add first name'],
      },
      lastName: {
        type: String,
        required: [true, 'Please add last name'],
      },
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    typeContact: {
      type: String,
      required: [true, 'Please add contact type'],
      default: 'Work',
    },
    address: adressSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
