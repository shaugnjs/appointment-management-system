// src/pages/Customers/CustomersPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../../components/Common/Button';
import CustomerList from '../../components/Customers/CustomerList';
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

const ErrorMessage = styled.div`
  color: #ef4444;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const CustomersPage = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('CustomersPage mounted');
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      console.log('Fetching customers...');
      const response = await axiosPrivate.get('/customers');
      console.log('Customers response:', response.data);
      setCustomers(response.data.data || []);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.response?.data?.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axiosPrivate.delete(`/customers/${id}`);
        setCustomers(prev => prev.filter(customer => customer.id !== id));
      } catch (err) {
        console.error('Failed to delete customer:', err);
      }
    }
  };

  const handleEdit = (customer) => {
    navigate(`/customers/edit/${customer.id}`, { state: { customer } });
  };

  if (loading) {
    console.log('Rendering loading state');
    return <Loading />;
  }

  console.log('Rendering customers:', customers);

  return (
    <PageContainer>
      <Header>
        <Title>Customers</Title>
        <Button 
          variant="primary"
          onClick={() => navigate('/customers/new')}
        >
          New Customer
        </Button>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <CustomerList
        customers={customers}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </PageContainer>
  );
};

export default CustomersPage;