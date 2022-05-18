const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Create a new address
// @route   POST /api/contacts/:id/address
// @access  Private
const createAddress = asyncHandler(async (req, res) => {
  if (req.body.length !== 4) {
    res.status(400);
    throw new Error('All fields are required');
  }
  if (!req.params.id) {
    res.status(400);
    throw new Error('Not found, Contact ID is required !');
  }

  const contact = await Contact.findById(req.params.id).select('address');
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  contact.address.push({
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
  });
  contact.save((err, contact) => {
    if (err) {
      res.status(400);
      throw new Error(err);
    } else {
      const updatedAddress = contact.address[contact.address.length - 1];
      res.status(201);
      res.json(updatedAddress);
    }
  });
});

// @desc    Get a specific address
// @route   GET /api/contacts/:id/address/:addressID
// @access  Private
const getAddress = asyncHandler(async (req, res) => {
  const { id, addressID } = req.params;
  const contact = await Contact.findById(id).select('address');
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  } else {
    if (contact.address && contact.address.length > 0) {
      const address = contact.address.id(addressID);
      if (!address) {
        res.status(404);
        throw new Error('Address not found');
      } else {
        res.status(200).json(address);
      }
    } else {
      res.status(404);
      throw new Error('NO Address available');
    }
  }
});

// @desc    Update a specific address
// @route   PUT /api/contacts/:id/address/:addressID
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
  const { id, addressID } = req.params;
  if (!id || !addressID) {
    res.status(400);
    throw new Error('BOTH CONTACT ID AND ADDRESS ID ARE REQUIRED');
  }
  const contact = await Contact.findById(id).select('name address');
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  const address = contact.address.id(addressID);
  if (!address) {
    res.status(404);
    throw new Error('Address not found');
  } else {
    address.state = req.body.state;
    address.city = req.body.city;
    address.street = req.body.street;
    address.zipCode = req.body.zipCode;
    contact.save((err, contact) => {
      if (err) {
        res.status(400);
        throw new Error(err);
      } else {
        res.status(200).json({ id, name: contact.name, address });
      }
    });
  }
});

// @desc    Delete a specific address
// @route   DELETE /api/contacts/:id/address/:addressID
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
  const { id, addressID } = req.params;
  if (!id || !addressID) {
    res.status(400);
    throw new Error('BOTH CONTACT ID AND ADDRESS ID ARE REQUIRED');
  }

  const contact = await Contact.findById(id).select('address');
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  const address = contact.address.id(addressID);
  if (!address) {
    res.status(404);
    throw new Error('Address not found');
  }
  address.remove();
  contact.save((error) => {
    if (error) {
      return res.status(404).json(error);
    } else {
      res.status(204).json(null);
    }
  });
});

module.exports = {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
