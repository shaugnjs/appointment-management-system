const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';
    let errors = err.errors || [];
  
    // Handle specific error types
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation Error';
      errors = Object.values(err.errors).map(error => ({
        field: error.path,
        message: error.message
      }));
    } else if (err.code === 'ER_DUP_ENTRY') {
      statusCode = 409;
      message = 'Duplicate entry';
    } else if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expired';
    }
  
    res.status(statusCode).json({
      success: false,
      message,
      errors,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorHandler;