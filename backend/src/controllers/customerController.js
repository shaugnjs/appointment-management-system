const db = require('../config/database');

exports.getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [customers] = await db.query(
      'SELECT * FROM customers LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [total] = await db.query('SELECT COUNT(*) as count FROM customers');

    res.json({
      data: customers,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(total[0].count / limit),
        total_items: total[0].count,
        items_per_page: limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if customer exists
    const [existing] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }

    const [result] = await db.query(
      'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone]
    );

    res.status(201).json({
      message: 'Customer created successfully',
      customerId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const [customers] = await db.query(
      'SELECT * FROM customers WHERE id = ?',
      [req.params.id]
    );

    if (customers.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customers[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const [result] = await db.query(
      'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    // Check if customer has appointments
    const [appointments] = await db.query(
      'SELECT * FROM appointments WHERE customer_id = ?',
      [req.params.id]
    );

    if (appointments.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete customer with existing appointments'
      });
    }

    const [result] = await db.query(
      'DELETE FROM customers WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};