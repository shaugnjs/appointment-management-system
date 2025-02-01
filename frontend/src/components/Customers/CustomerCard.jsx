// src/components/Customers/CustomerCard.jsx
import { memo } from 'react';
import styled from '@emotion/styled';
import Button from '../Common/Button';
import { formatPhoneNumber } from '../../utils/formatters';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CustomerName = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 1.125rem;
`;

const CustomerInfo = styled.div`
  margin-bottom: 1.5rem;
  
  p {
    margin: 0.5rem 0;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #374151;
  min-width: 60px;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const CustomerCard = memo(({ customer, onDelete, onEdit }) => {
  return (
    <Card>
      <Header>
        <CustomerName>{customer.name}</CustomerName>
      </Header>

      <CustomerInfo>
        <p>
          <InfoLabel>Email:</InfoLabel>
          <span>{customer.email}</span>
        </p>
        <p>
          <InfoLabel>Phone:</InfoLabel>
          <span>{formatPhoneNumber(customer.phone)}</span>
        </p>
      </CustomerInfo>

      <Actions>
        <Button 
          variant="secondary" 
          onClick={() => onEdit(customer)}
          fullWidth
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          onClick={() => onDelete(customer.id)}
          fullWidth
        >
          Delete
        </Button>
      </Actions>
    </Card>
  );
});

CustomerCard.displayName = 'CustomerCard';

export default CustomerCard;