// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Card from '../../components/Common/Card';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

const DashboardContainer = styled.div`
  padding: 1.5rem;
`;

const DashboardTitle = styled.h1`
  color: #111827;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const RecentSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  color: #374151;
  margin-bottom: 1rem;
`;

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalCustomers: 0,
    totalServices: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, you might have a dedicated endpoint for dashboard stats
        const [appointments, customers, services] = await Promise.all([
          axiosPrivate.get('/appointments'),
          axiosPrivate.get('/customers'),
          axiosPrivate.get('/services')
        ]);

        setStats({
          totalAppointments: appointments.data.data.length,
          totalCustomers: customers.data.data.length,
          totalServices: services.data.data.length
        });

        setRecentAppointments(appointments.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.totalAppointments}</StatValue>
          <StatLabel>Total Appointments</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalCustomers}</StatValue>
          <StatLabel>Total Customers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalServices}</StatValue>
          <StatLabel>Available Services</StatLabel>
        </StatCard>
      </StatsGrid>

      <RecentSection>
        <SectionTitle>Recent Appointments</SectionTitle>
        {recentAppointments.map(appointment => (
          <Card key={appointment.id} margin="0 0 1rem 0">
            <div>
              <strong>{appointment.customer_name}</strong>
              <p>{new Date(appointment.start_time).toLocaleString()}</p>
              <p>{appointment.service_name}</p>
            </div>
          </Card>
        ))}
      </RecentSection>
    </DashboardContainer>
  );
};

export default Dashboard;