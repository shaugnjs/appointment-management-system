// src/components/Services/ServiceCard.jsx
import styled from '@emotion/styled';
import Button from '../Common/Button';

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

const ServiceName = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 1.125rem;
`;

const Price = styled.span`
  font-weight: 600;
  color: #2563eb;
  font-size: 1.125rem;
`;

const ServiceInfo = styled.div`
  margin-bottom: 1.5rem;
  
  p {
    margin: 0.5rem 0;
    color: #4b5563;
  }
`;

const Duration = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 1rem 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const ServiceCard = ({ service, onDelete, onEdit }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Card>
      <Header>
        <ServiceName>{service.name}</ServiceName>
        <Price>{formatPrice(service.price)}</Price>
      </Header>

      <Duration>
        {service.duration} minutes
      </Duration>

      {service.description && (
        <Description>{service.description}</Description>
      )}

      <Actions>
        <Button 
          variant="secondary" 
          onClick={() => onEdit(service)}
          fullWidth
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          onClick={() => onDelete(service.id)}
          fullWidth
        >
          Delete
        </Button>
      </Actions>
    </Card>
  );
};

export default ServiceCard;