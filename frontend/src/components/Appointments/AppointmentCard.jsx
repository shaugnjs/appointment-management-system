// src/components/Appointments/AppointmentCard.jsx
import styled from '@emotion/styled';
import Button from '../Common/Button';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  color: #111827;
`;

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${({ status }) => {
    switch (status) {
      case 'scheduled':
        return 'background: #dbeafe; color: #1e40af;';
      case 'completed':
        return 'background: #dcfce7; color: #166534;';
      case 'cancelled':
        return 'background: #fee2e2; color: #991b1b;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  }}
`;

const Info = styled.div`
  margin-bottom: 1rem;
  
  p {
    margin: 0.5rem 0;
    color: #4b5563;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const AppointmentCard = ({ appointment, onDelete, onEdit }) => {
  return (
    <Card>
      <Header>
        <Title>{appointment.service_name}</Title>
        <Status status={appointment.status}>{appointment.status}</Status>
      </Header>

      <Info>
        <p><strong>Customer:</strong> {appointment.customer_name}</p>
        <p><strong>Start:</strong> {formatDate(appointment.start_time)}</p>
        <p><strong>End:</strong> {formatDate(appointment.end_time)}</p>
        {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
      </Info>

      <Actions>
        <Button variant="secondary" onClick={() => onEdit(appointment)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(appointment.id)}>
          Cancel
        </Button>
      </Actions>
    </Card>
  );
};

export default AppointmentCard;