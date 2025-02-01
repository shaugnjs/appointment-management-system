const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const customerRoutes = require('./routes/customers');
const serviceRoutes = require('./routes/services');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/services', serviceRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Appointment Management System API',
    version: '1.0.0',
    status: 'active'
  });
});

// Error handling
app.use(errorHandler);

const { apiLimiter } = require('./middleware/rateLimiter');

// Apply rate limiting to all routes
app.use('/api/', apiLimiter);

// // Apply stricter rate limiting to auth routes
// app.use('/api/auth/', authLimiter);

module.exports = app;
