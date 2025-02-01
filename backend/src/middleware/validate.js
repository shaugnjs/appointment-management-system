const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for different routes
const customerValidationRules = {
  create: [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().matches(/^\+?[\d\s-]{10,}$/).withMessage('Invalid phone number format')
  ],
  update: [
    body('name').optional().trim(),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('phone').optional().matches(/^\+?[\d\s-]{10,}$/).withMessage('Invalid phone number format')
  ]
};

const serviceValidationRules = {
  create: [
    body('name').notEmpty().trim().withMessage('Service name is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().trim()
  ],
  update: [
    body('name').optional().trim(),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive number'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().trim()
  ]
};

const appointmentValidationRules = {
  create: [
    body('customer_id').isInt().withMessage('Valid customer ID is required'),
    body('service_id').isInt().withMessage('Valid service ID is required'),
    body('start_time').isISO8601().withMessage('Valid start time is required'),
    body('end_time').isISO8601().withMessage('Valid end time is required'),
    body('notes').optional().trim()
  ],
  update: [
    body('customer_id').optional().isInt().withMessage('Valid customer ID is required'),
    body('service_id').optional().isInt().withMessage('Valid service ID is required'),
    body('start_time').optional().isISO8601().withMessage('Valid start time is required'),
    body('end_time').optional().isISO8601().withMessage('Valid end time is required'),
    body('status').optional().isIn(['scheduled', 'completed', 'cancelled']).withMessage('Invalid status'),
    body('notes').optional().trim()
  ]
};

module.exports = {
  validate,
  customerValidationRules,
  serviceValidationRules,
  appointmentValidationRules
};