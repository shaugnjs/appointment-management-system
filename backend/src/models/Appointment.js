onst db = require('../config/database');

class Appointment {
  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [appointments] = await db.query(
      `SELECT a.*, c.name as customer_name, s.name as service_name 
       FROM appointments a 
       JOIN customers c ON a.customer_id = c.id 
       JOIN services s ON a.service_id = s.id 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return appointments;
  }

  static async findById(id) {
    const [appointments] = await db.query(
      `SELECT a.*, c.name as customer_name, s.name as service_name 
       FROM appointments a 
       JOIN customers c ON a.customer_id = c.id 
       JOIN services s ON a.service_id = s.id 
       WHERE a.id = ?`,
      [id]
    );
    return appointments[0];
  }

  static async create(appointmentData) {
    const { customer_id, service_id, start_time, end_time, notes } = appointmentData;
    const [result] = await db.query(
      'INSERT INTO appointments (customer_id, service_id, start_time, end_time, notes) VALUES (?, ?, ?, ?, ?)',
      [customer_id, service_id, start_time, end_time, notes]
    );
    return result.insertId;
  }

  static async update(id, appointmentData) {
    const { customer_id, service_id, start_time, end_time, notes, status } = appointmentData;
    const [result] = await db.query(
      `UPDATE appointments 
       SET customer_id = ?, service_id = ?, start_time = ?, end_time = ?, notes = ?, status = ? 
       WHERE id = ?`,
      [customer_id, service_id, start_time, end_time, notes, status, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Appointment;