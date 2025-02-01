// src/components/Common/Select.jsx
import styled from '@emotion/styled';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StyledSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  ${props => props.error && `
    border-color: #ef4444;
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
    }
  `}
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
`;

const Select = ({ 
  label, 
  error, 
  children, 
  ...props 
}) => {
  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <StyledSelect error={error} {...props}>
        {children}
      </StyledSelect>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectWrapper>
  );
};

export default Select;