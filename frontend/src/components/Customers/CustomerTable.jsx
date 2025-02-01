// src/components/Customers/CustomerTable.jsx
import styled from '@emotion/styled';
import Button from '../Common/Button';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: #f9fafb;
  font-weight: 500;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
`;

const ActionCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
`;

const CustomerTable = ({ customers = [], onDelete, onEdit }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <Td>{customer.name}</Td>
            <Td>{customer.email}</Td>
            <Td>{customer.phone}</Td>
            <ActionCell>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => onEdit(customer)}
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                size="small"
                onClick={() => onDelete(customer.id)}
              >
                Delete
              </Button>
            </ActionCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerTable;