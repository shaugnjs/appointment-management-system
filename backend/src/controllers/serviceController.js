const db = require('../config/database');

exports.getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [services] = await db.query(
      'SELECT * FROM services LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [total] = await db.query('SELECT COUNT(*) as count FROM services');

    res.json({
      data: services,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(total[0].count / limit),
        total_items: total[0].count,
        items_per_page: limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { name, duration, description, price } = req.body;

    const [result] = await db.query(
      'INSERT INTO services (name, duration, description, price) VALUES (?, ?, ?, ?)',
      [name, duration, description, price]
    );

    res.status(201).json({
      message: 'Service created successfully',
      serviceId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const [services] = await db.query(
      'SELECT * FROM services WHERE id = ?',
      [req.params.id]
    );

    if (services.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(services[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { name, duration, description, price } = req.body;

    const [result] = await db.query(
      'UPDATE services SET name = ?, duration = ?, description = ?, price = ? WHERE id = ?',
      [name, duration, description, price, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    // Check if service has appointments
    const [appointments] = await db.query(
      'SELECT * FROM appointments WHERE service_id = ?',
      [req.params.id]
    );

    if (appointments.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete service with existing appointments'
      });
    }

    const [result] = await db.query(
      'DELETE FROM services WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};