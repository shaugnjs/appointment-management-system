// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import { AuthProvider } from './context/AuthContext';
import { globalStyles } from './styles/globalStyles';
import { useAuth } from './hooks/useAuth';

// Layout
import Layout from './components/Layout/Layout';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Main Pages
import Dashboard from './pages/Dashboard/Dashboard';
import AppointmentsPage from './pages/Appointments/AppointmentsPage';
import NewAppointment from './pages/Appointments/NewAppointment';
import CustomersPage from './pages/Customers/CustomersPage';
import NewCustomer from './pages/Customers/NewCustomer';
import EditCustomer from './pages/Customers/EditCustomer';
import ServicesPage from './pages/Services/ServicesPage';
import NewService from './pages/Services/NewService';
import EditService from './pages/Services/EditService';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Appointments Routes */}
      <Route path="/appointments" element={
        <ProtectedRoute>
          <Layout>
            <AppointmentsPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/appointments/new" element={
        <ProtectedRoute>
          <Layout>
            <NewAppointment />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Customers Routes */}
      <Route path="/customers" element={
        <ProtectedRoute>
          <Layout>
            <CustomersPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/customers/new" element={
        <ProtectedRoute>
          <Layout>
            <NewCustomer />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/customers/edit/:id" element={
        <ProtectedRoute>
          <Layout>
            <EditCustomer />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Services Routes */}
      <Route path="/services" element={
        <ProtectedRoute>
          <Layout>
            <ServicesPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/services/new" element={
        <ProtectedRoute>
          <Layout>
            <NewService />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/services/edit/:id" element={
        <ProtectedRoute>
          <Layout>
            <EditService />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Global styles={globalStyles} />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;