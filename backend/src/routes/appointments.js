const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

router.use(auth); // Protect all appointment routes

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;