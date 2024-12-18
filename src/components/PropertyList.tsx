'use client';

import { useState, useEffect } from 'react';

interface Property {
  id: number;
  name: string;
  address: string;
  price: string;
  propertyType: string;
  imageUrl: string;
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchId, setSearchId] = useState<string>('');
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const [validId, setValidId] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data.data);
        setTotalProperties(data.total);
      } catch (error) {
        setError('Error fetching properties: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page]);


  const handleSearchById = async () => {
    const numericId = parseInt(searchId, 10);
    if (!isNaN(numericId) && numericId > 0) {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${numericId}`);
        if (!response.ok) {
          return 'Property not found';
        }
        const property = await response.json();
        setProperties([property]);  
      } catch (error) {
        setError('Error fetching property: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    } else {
      setValidId(false); 
    }
  };

 
  const handleNextPage = () => {
    if (page * 10 < totalProperties) setPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchId(value);
    if (isNaN(Number(value)) || value.trim() === '') {
      setValidId(false); 
    } else {
      setValidId(true); 
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Property Listings</h1>

      
      <div className="mb-4">
        <input
          type="text"
          value={searchId}
          onChange={handleSearchChange}
          placeholder="Search by ID"
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearchById}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        {!validId && <p className="text-red-500">Please enter a valid ID.</p>}
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={property.imageUrl || 'https://via.placeholder.com/300'}
              alt={property.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold">{property.name}</h3>
            <p>{property.address}</p>
            <p className="text-lg font-bold">{property.price}</p>
            <p className="text-sm text-gray-500">{property.propertyType}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={page * 10 >= totalProperties}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
