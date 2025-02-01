// src/pages/Services/EditService.jsx
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ServiceForm from '../../components/Services/ServiceForm';
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

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (location.state?.service) {
          setService(location.state.service);
        } else {
          const response = await axiosPrivate.get(`/services/${id}`);
          setService(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await axiosPrivate.put(`/services/${id}`, formData);
      navigate('/services');
    } catch (err) {
      console.error('Failed to update service:', err);
    }
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <Header>
        <Title>Edit Service</Title>
      </Header>

      <Card>
        <ServiceForm 
          initialData={service} 
          onSubmit={handleSubmit} 
        />
      </Card>
    </PageContainer>
  );
};

export default EditService;