const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Get all the contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // Check for contacts
  if (!contacts) {
    res.status(404);
    throw new Error('Contacts not found');
  }
  res.status(200).json(contacts);
});

// @desc    Get a specific contact
// @route   GET /api/contacts/:id
// @access  Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  // check if the contact exist
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found!');
  }
  res.status(200).json(contact);
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Private
const createContact = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
});

// @desc    Update a specific contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  // Check if the contact exist
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }
  // Check if all fields are filled
  if (Object.keys(req.body).length !== 5) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc    Delete a specific contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  // Check if the contact exist
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  await contact.remove();
  res.status(204).json({ id: req.params.id, message: 'Deleted' });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
