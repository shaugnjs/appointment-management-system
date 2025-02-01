// src/components/Services/ServiceForm.jsx
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

const ServiceForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    duration: '',
    description: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>
        {initialData ? 'Edit Service' : 'Add New Service'}
      </FormTitle>

      <Input
        label="Service Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter service name"
        required
      />

      <Input
        label="Duration (minutes)"
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Enter duration in minutes"
        min="1"
        required
      />

      <Input
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Enter price"
        step="0.01"
        min="0"
        required
      />

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter service description"
        multiline
        rows={4}
      />

      <Button type="submit" variant="primary">
        {initialData ? 'Update Service' : 'Add Service'}
      </Button>
    </Form>
  );
};

export default ServiceForm;