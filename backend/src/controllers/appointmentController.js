const db = require('../config/database');

exports.getAllAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [appointments] = await db.query(
      `SELECT a.*, c.name as customer_name, s.name as service_name 
       FROM appointments a 
       JOIN customers c ON a.customer_id = c.id 
       JOIN services s ON a.service_id = s.id 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [total] = await db.query('SELECT COUNT(*) as count FROM appointments');

    res.json({
      data: appointments,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(total[0].count / limit),
        total_items: total[0].count,
        items_per_page: limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { customer_id, service_id, start_time, end_time, notes } = req.body;

    const [result] = await db.query(
      'INSERT INTO appointments (customer_id, service_id, start_time, end_time, notes) VALUES (?, ?, ?, ?, ?)',
      [customer_id, service_id, start_time, end_time, notes]
    );

    res.status(201).json({
      message: 'Appointment created successfully',
      appointmentId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const [appointments] = await db.query(
      `SELECT a.*, c.name as customer_name, s.name as service_name 
       FROM appointments a 
       JOIN customers c ON a.customer_id = c.id 
       JOIN services s ON a.service_id = s.id 
       WHERE a.id = ?`,
      [req.params.id]
    );

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointments[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { customer_id, service_id, start_time, end_time, notes, status } = req.body;

    const [result] = await db.query(
      `UPDATE appointments 
       SET customer_id = ?, service_id = ?, start_time = ?, 
           end_time = ?, notes = ?, status = ? 
       WHERE id = ?`,
      [customer_id, service_id, start_time, end_time, notes, status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};
