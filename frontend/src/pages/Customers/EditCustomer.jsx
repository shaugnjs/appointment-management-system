// src/pages/Customers/EditCustomer.jsx
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CustomerForm from '../../components/Customers/CustomerForm';
import Card from '../../components/Common/Card';
import Loading from '../../components/Common/Loading';
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

const EditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (location.state?.customer) {
          setCustomer(location.state.customer);
        } else {
          const response = await axiosPrivate.get(`/customers/${id}`);
          setCustomer(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch customer:', err);
        navigate('/customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await axiosPrivate.put(`/customers/${id}`, formData);
      navigate('/customers');
    } catch (err) {
      console.error('Failed to update customer:', err);
    }
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <Header>
        <Title>Edit Customer</Title>
      </Header>

      <Card>
        <CustomerForm 
          initialData={customer} 
          onSubmit={handleSubmit} 
        />
      </Card>
    </PageContainer>
  );
};

export default EditCustomer;
