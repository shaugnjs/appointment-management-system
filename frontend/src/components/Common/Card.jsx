// src/components/Common/Card.jsx
import styled from '@emotion/styled';

const StyledCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '1.5rem'};
  margin: ${props => props.margin || '0'};
`;

const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card;