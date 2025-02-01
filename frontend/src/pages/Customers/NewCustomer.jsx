// src/pages/Customers/NewCustomer.jsx
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import CustomerForm from '../../components/Customers/CustomerForm';
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

const NewCustomer = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (formData) => {
    try {
      await axiosPrivate.post('/customers', formData);
      navigate('/customers');
    } catch (err) {
      console.error('Failed to create customer:', err);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>New Customer</Title>
      </Header>

      <Card>
        <CustomerForm onSubmit={handleSubmit} />
      </Card>
    </PageContainer>
  );
};

export default NewCustomer;