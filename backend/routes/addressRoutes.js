const express = require('express');
const router = express.Router();

const {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.route('/:id/address').post(createAddress);
router
  .route('/:id/address/:addressID')
  .get(getAddress)
  .put(updateAddress)
  .delete(deleteAddress);

module.exports = router;
