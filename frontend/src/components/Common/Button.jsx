// src/components/Common/Button.jsx
import styled from '@emotion/styled';

const StyledButton = styled.button`
  padding: ${props => props.size === 'small' ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  border-radius: 6px;
  font-weight: 500;
  font-size: ${props => props.size === 'small' ? '0.875rem' : '1rem'};
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #2563eb;
          color: white;
          &:hover {
            background-color: #1d4ed8;
          }
        `;
      case 'secondary':
        return `
          background-color: #e5e7eb;
          color: #374151;
          &:hover {
            background-color: #d1d5db;
          }
        `;
      case 'danger':
        return `
          background-color: #ef4444;
          color: white;
          &:hover {
            background-color: #dc2626;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid #2563eb;
          color: #2563eb;
          &:hover {
            background-color: #eff6ff;
          }
        `;
      default:
        return `
          background-color: #2563eb;
          color: white;
          &:hover {
            background-color: #1d4ed8;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: ${props => {
        switch (props.variant) {
          case 'primary': return '#2563eb';
          case 'secondary': return '#e5e7eb';
          case 'danger': return '#ef4444';
          case 'outline': return 'transparent';
          default: return '#2563eb';
        }
      }};
    }
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;