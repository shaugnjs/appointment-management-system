// src/components/Services/ServiceList.jsx
import { useState } from 'react';
import styled from '@emotion/styled';
import ServiceCard from './ServiceCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const NoServices = styled.div`
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

const ServiceList = ({ services = [], onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (services.length === 0) {
    return <NoServices>No services found</NoServices>;
  }

  return (
    <div>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <ListContainer>
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ListContainer>
    </div>
  );
};

export default ServiceList;
