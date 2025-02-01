// src/components/Layout/Navbar.jsx
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: #4b5563;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #dc2626;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <NavContainer>
      <Logo>Appointment System</Logo>
      <UserSection>
        <UserName>{user?.username}</UserName>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </UserSection>
    </NavContainer>
  );
};

export default Navbar;
