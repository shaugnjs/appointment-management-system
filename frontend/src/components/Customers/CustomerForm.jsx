// src/components/Customers/CustomerForm.jsx
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Common/Button';
import Input from '../Common/Input';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: #111827;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CustomerForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>
        {initialData ? 'Edit Customer' : 'Add New Customer'}
      </FormTitle>

      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter customer's full name"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter customer's email"
        required
      />

      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter customer's phone number"
        required
      />

      <Button type="submit" variant="primary">
        {initialData ? 'Update Customer' : 'Add Customer'}
      </Button>
    </Form>
  );
};

export default CustomerForm;