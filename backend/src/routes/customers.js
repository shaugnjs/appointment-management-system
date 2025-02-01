const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

// Apply authentication middleware to all customer routes
router.use(auth);

// Customer routes
router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.get('/:id', getCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;