// src/components/Appointments/AppointmentForm.jsx
import { useState } from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Common/Button';
import Input from '../Common/Input';
import Select from '../Common/Select';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const AppointmentForm = ({ 
  onSubmit, 
  customers = [], 
  services = [], 
  initialData = null 
}) => {
  const [formData, setFormData] = useState(initialData || {
    customer_id: '',
    service_id: '',
    start_time: new Date(),
    end_time: new Date(),
    notes: ''
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
      <Select
        label="Customer"
        name="customer_id"
        value={formData.customer_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Customer</option>
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </Select>

      <Select
        label="Service"
        name="service_id"
        value={formData.service_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Service</option>
        {services.map(service => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </Select>

      <div>
        <label>Start Time</label>
        <DatePicker
          selected={formData.start_time}
          onChange={date => setFormData(prev => ({ ...prev, start_time: date }))}
          showTimeSelect
          dateFormat="Pp"
          className="custom-datepicker"
        />
      </div>

      <div>
        <label>End Time</label>
        <DatePicker
          selected={formData.end_time}
          onChange={date => setFormData(prev => ({ ...prev, end_time: date }))}
          showTimeSelect
          dateFormat="Pp"
          className="custom-datepicker"
        />
      </div>

      <Input
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        multiline
      />

      <Button type="submit">
        {initialData ? 'Update Appointment' : 'Create Appointment'}
      </Button>
    </Form>
  );
};

export default AppointmentForm;