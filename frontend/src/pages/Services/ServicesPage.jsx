// src/pages/Services/ServicesPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../../components/Common/Button';
import ServiceList from '../../components/Services/ServiceList';
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

const ServicesPage = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axiosPrivate.get('/services');
      setServices(response.data.data);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axiosPrivate.delete(`/services/${id}`);
        setServices(services.filter(service => service.id !== id));
      } catch (err) {
        console.error('Failed to delete service:', err);
      }
    }
  };

  const handleEdit = (service) => {
    navigate(`/services/edit/${service.id}`, { state: { service } });
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <PageContainer>
      <Header>
        <Title>Services</Title>
        <Button 
          variant="primary"
          onClick={() => navigate('/services/new')}
        >
          New Service
        </Button>
      </Header>

      <ServiceList
        services={services}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </PageContainer>
  );
};

export default ServicesPage;