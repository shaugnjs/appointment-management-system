// src/components/Layout/Layout.jsx
import styled from '@emotion/styled';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`;

const MainContent = styled.main`
  margin-left: 250px;
  padding: 80px 2rem 2rem;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <Sidebar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;