// src/components/Appointments/AppointmentList.jsx
import styled from '@emotion/styled';
import AppointmentCard from './AppointmentCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const NoAppointments = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const AppointmentList = ({ appointments = [], onDelete, onEdit }) => {
  if (appointments.length === 0) {
    return <NoAppointments>No appointments found</NoAppointments>;
  }

  return (
    <ListContainer>
      {appointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ListContainer>
  );
};

export default AppointmentList;