const db = require('../config/database');

class Service {
  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [services] = await db.query(
      'SELECT * FROM services LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return services;
  }

  static async findById(id) {
    const [services] = await db.query(
      'SELECT * FROM services WHERE id = ?',
      [id]
    );
    return services[0];
  }

  static async create(serviceData) {
    const { name, duration, description, price } = serviceData;
    const [result] = await db.query(
      'INSERT INTO services (name, duration, description, price) VALUES (?, ?, ?, ?)',
      [name, duration, description, price]
    );
    return result.insertId;
  }

  static async update(id, serviceData) {
    const { name, duration, description, price } = serviceData;
    const [result] = await db.query(
      'UPDATE services SET name = ?, duration = ?, description = ?, price = ? WHERE id = ?',
      [name, duration, description, price, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async hasAppointments(id) {
    const [appointments] = await db.query(
      'SELECT COUNT(*) as count FROM appointments WHERE service_id = ?',
      [id]
    );
    return appointments[0].count > 0;
}
}

module.exports = Service;