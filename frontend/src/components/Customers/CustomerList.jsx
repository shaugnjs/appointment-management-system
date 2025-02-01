// src/components/Customers/CustomerList.jsx
import { useState } from 'react'; // Add this import
import styled from '@emotion/styled';
import CustomerCard from './CustomerCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const NoCustomers = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  background: white;
  border-radius: 8px;
  margin: 1rem;
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const CustomerList = ({ customers = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (customers.length === 0) {
    return <NoCustomers>No customers found</NoCustomers>;
  }

  return (
    <div>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <ListContainer>
        {filteredCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ListContainer>
    </div>
  );
};

export default CustomerList;