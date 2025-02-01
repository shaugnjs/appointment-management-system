// src/pages/Appointments/NewAppointment.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import AppointmentForm from '../../components/Appointments/AppointmentForm';
import Card from '../../components/Common/Card';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

const PageContainer = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #111827;
`;

const NewAppointment = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, servicesRes] = await Promise.all([
          axiosPrivate.get('/customers'),
          axiosPrivate.get('/services')
        ]);
        setCustomers(customersRes.data.data);
        setServices(servicesRes.data.data);
      } catch (err) {
        setError('Failed to fetch required data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await axiosPrivate.post('/appointments', formData);
      navigate('/appointments');
    } catch (err) {
      console.error('Failed to create appointment:', err);
      setError(err.response?.data?.message || 'Failed to create appointment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer>
      <Header>
        <Title>New Appointment</Title>
      </Header>

      <Card>
        <AppointmentForm
          customers={customers}
          services={services}
          onSubmit={handleSubmit}
        />
      </Card>
    </PageContainer>
  );
};

export default NewAppointment;