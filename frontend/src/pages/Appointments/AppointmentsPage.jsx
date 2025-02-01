// src/pages/Appointments/AppointmentsPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../../components/Common/Button';
import AppointmentList from '../../components/Appointments/AppointmentList';
import Loading from '../../components/Common/Loading';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

const PageContainer = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #111827;
`;

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axiosPrivate.get('/appointments');
      setAppointments(response.data.data);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axiosPrivate.delete(`/appointments/${id}`);
        setAppointments(appointments.filter(apt => apt.id !== id));
      } catch (err) {
        console.error('Failed to delete appointment:', err);
      }
    }
  };

  const handleEdit = (appointment) => {
    navigate(`/appointments/edit/${appointment.id}`, { state: { appointment } });
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer>
      <Header>
        <Title>Appointments</Title>
        <Button 
          variant="primary"
          onClick={() => navigate('/appointments/new')}
        >
          New Appointment
        </Button>
      </Header>

      <AppointmentList
        appointments={appointments}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </PageContainer>
  );
};

export default AppointmentsPage;