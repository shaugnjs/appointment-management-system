const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllServices,
  createService,
  getService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// Apply authentication middleware to all service routes
router.use(auth);

// Service routes
router.get('/', getAllServices);
router.post('/', createService);
router.get('/:id', getService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;