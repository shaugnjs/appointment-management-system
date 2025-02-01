// src/pages/Services/NewService.jsx
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ServiceForm from '../../components/Services/ServiceForm';
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

const NewService = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (formData) => {
    try {
      await axiosPrivate.post('/services', formData);
      navigate('/services');
    } catch (err) {
      console.error('Failed to create service:', err);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>New Service</Title>
      </Header>

      <Card>
        <ServiceForm onSubmit={handleSubmit} />
      </Card>
    </PageContainer>
  );
};

export default NewService;