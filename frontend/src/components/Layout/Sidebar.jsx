// src/components/Layout/Sidebar.jsx
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 250px;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  &.active {
    background: #2563eb;
    color: white;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <NavList>
        <NavItem>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/appointments">Appointments</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/customers">Customers</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/services">Services</StyledNavLink>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
