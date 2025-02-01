const db = require('../config/database');

class Customer {
  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [customers] = await db.query(
      'SELECT * FROM customers LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return customers;
  }

  static async findById(id) {
    const [customers] = await db.query(
      'SELECT * FROM customers WHERE id = ?',
      [id]
    );
    return customers[0];
  }

  static async findByEmail(email) {
    const [customers] = await db.query(
      'SELECT * FROM customers WHERE email = ?',
      [email]
    );
    return customers[0];
  }

  static async create(customerData) {
    const { name, email, phone } = customerData;
    const [result] = await db.query(
      'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );
    return result.insertId;
  }

  static async update(id, customerData) {
    const { name, email, phone } = customerData;
    const [result] = await db.query(
      'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM customers WHERE id = ?', [id]);
    return result.affectedRows;
  }

  static async hasAppointments(id) {
    const [appointments] = await db.query(
      'SELECT COUNT(*) as count FROM appointments WHERE customer_id = ?',
      [id]
    );
    return appointments[0].count > 0;
  }
}

module.exports = Customer;